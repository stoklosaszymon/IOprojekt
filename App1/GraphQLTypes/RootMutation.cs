using GraphQL.Types;
using IOprojekt.Classes;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace IOprojekt.GraphQLTypes
{
    public class RootMutation : ObjectGraphType
    {
        private readonly IRepository<User> users;
        public RootMutation(IDbContext context, IOptions<MongoSettings> conf)
        {

            if ( context != null)
                users = context.Users;

            Field<UserType>("addUser",
                arguments: new QueryArguments
                {
                    new QueryArgument<InputUserType>() { Name = "user" }
                },
                resolve: context =>
                {
                    var user = context.GetArgument<User>("user");
                    return users.Add(user);
                }
             );

            Field<IntGraphType>("deleteUser",
                arguments: new QueryArguments
                {
                     new QueryArgument<IntGraphType>() { Name = "userId" }
                },
                resolve: context =>
                {
                    var id = context.GetArgument<int>("userId");
                    var builder = Builders<User>.Filter;
                    var filter = builder.Eq(user => user.Id, id);
                    return users.Delete(filter);
                }
             );

            Field<UserType>("updateUser",
               arguments: new QueryArguments
               {
                     new QueryArgument<InputUserType>() { Name = "user" }
               },
               resolve: context =>
               {
                   var user = context.GetArgument<User>("user");
                   var builder = Builders<User>.Filter;
                   var filter = builder.Eq(user => user.Id, user.Id);
                   var update = Builders<User>.Update
                                        .Set("firstName", user.FirstName)
                                        .Set("lastName", user.LastName);

                   return users.Update(filter, update);
               }
            );

        }
    }
}
