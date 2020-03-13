﻿using GraphQL.Types;
using IOprojekt.Models;
using IOprojekt.Repositories;

namespace IOprojekt.GraphQLTypes
{
    public class RootMutation : ObjectGraphType
    {

        public RootMutation(IUserRepository userRepository)
        {
            Field<UserType>(
                "addUser",
                arguments: new QueryArguments
                {
                    new QueryArgument<InputUserType>(){ Name = "user" }
                },
                resolve: context =>
                {
                    var user = context.GetArgument<User>("user");
                    return userRepository.AddUser(user);
                }
             );
        }
    }
}