using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Driver;
using System;

namespace IOprojekt.GraphQLTypes
{
    public class UserMutation : ObjectGraphType
    {
        private readonly IDbContext _context;
        public UserMutation(IDbContext context)
        {

            if (context != null)
                _context = context;

            // Name = "UserMutation";

            Field<UserType>("addUser",
                arguments: new QueryArguments
                {
                    new QueryArgument<InputUserType>() { Name = "user" }
                },
                resolve: context =>
                {
                    var user = context.GetArgument<User>("user");
                    user.CreatedAt = DateTime.Now;
                    return _context.Users.Add(user);
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
                    return _context.Users.Delete(filter);
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

                   return _context.Users.Update(filter, update);
               }
            );

        }
    }
}
