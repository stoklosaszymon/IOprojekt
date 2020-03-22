using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using MongoDB.Driver;
using System.Linq;

namespace IOprojekt.GraphQLTypes
{
    public class RootQuery : ObjectGraphType
    {
        private readonly IRepository<User> users;
        public RootQuery(IDbContext context)
        {
            if ( context != null)
                users = context.Users;

            Field<ListGraphType<UserType>>("users",
            resolve: context =>
            {
                return users.GetAll( FilterDefinition<User>.Empty );
            });

            Field<ListGraphType<UserType>>("userById",
            arguments: new QueryArguments
            {
               new  QueryArgument<IntGraphType> { Name = "id"}
            },
            resolve: context =>
            {
                int id = context.GetArgument<int>("id");
                return users.GetAll("{ Id:" + id  +"}");
            });
        }
    }
}