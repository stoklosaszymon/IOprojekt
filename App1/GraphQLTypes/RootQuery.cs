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
        public RootQuery(IRepositoryFactory factory)
        {
            Field<ListGraphType<UserType>>("users",
            resolve: context =>
            {
                return factory.Create<User>(new RepositoryOptions("mongodb+srv://client:nhpQ3hVzxMIhrCJv@ioproject-vkivc.mongodb.net/test?retryWrites=true&w=majority", "UsersDb", "Users")).GetAll(FilterDefinition<User>.Empty);
            });

            Field<ListGraphType<UserType>>("userById",
            arguments: new QueryArguments
            {
               new  QueryArgument<IntGraphType> { Name = "id"}
            },
            resolve: context =>
            {
                int id = context.GetArgument<int>("id");
                return factory.Create<User>(new RepositoryOptions("mongodb+srv://client:nhpQ3hVzxMIhrCJv@ioproject-vkivc.mongodb.net/test?retryWrites=true&w=majority", "UsersDb", "Users")).GetAll("{ Id:" + id  +"}");
            });
        }
    }
}