using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using Microsoft.Extensions.Options;

namespace IOprojekt.GraphQLTypes
{
    public class RootMutation : ObjectGraphType
    {

        public RootMutation(IRepositoryFactory factory)
        {
            Field<UserType>( "addUser",
                arguments: new QueryArguments
                {
                    new QueryArgument<InputUserType>() { Name = "user" }
                },
                resolve: context =>
                {
                    var user = context.GetArgument<User>("user");
                    return factory.Create<User>(new RepositoryOptions("mongodb+srv://client:nhpQ3hVzxMIhrCJv@ioproject-vkivc.mongodb.net/test?retryWrites=true&w=majority", "UsersDb", "Users")).Add(user);
                }
             );

            //Field<IntGraphType>( "deleteUser", 
            //    arguments: new QueryArguments
            //    {
            //        new QueryArgument<IntGraphType>() { Name = "userId" }
            //    },
            //    resolve: context => 
            //    {
            //        var id = context.GetArgument<int>("userId");
            //        return repository.Remove(id);
            //    }
            // );
            //
            //Field<UserType>("updateUser",
            //   arguments: new QueryArguments
            //   {
            //        new QueryArgument<InputUserType>() { Name = "user" }
            //   },
            //   resolve: context =>
            //   {
            //       var user = context.GetArgument<User>("user");
            //       return repository.Update(user);
            //   }
            //);

        }
    }
}
