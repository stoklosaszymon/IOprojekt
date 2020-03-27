using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;

namespace IOprojekt.GraphQLTypes
{
    public class UserQuery : ObjectGraphType
    {
        private readonly IDbContext _context;
        public UserQuery(IDbContext context)
        {
            if ( context != null)
                _context = context;
            Name = "UsersQuery";

            Field<ListGraphType<UserType>>("getAll",
            resolve: context =>
            {
                return _context.Users.GetAll( FilterDefinition<User>.Empty );
            });

            Field<UserType>("userById",
            arguments: new QueryArguments
            {
               new  QueryArgument<IntGraphType> { Name = "id"}
            },
            resolve: context =>
            {
                var id = context.GetArgument<int>("id");
                var filter = Builders<User>.Filter.Eq(user => user.Id, id);
                return _context.Users.GetAll(filter).Result.FirstOrDefault();
            });
        }
    }
}