using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Driver;
using System.Linq;

namespace IOprojekt.GraphQLTypes
{
    public class UserQuery : ObjectGraphType
    {
        private readonly IDbContext _context;
        public UserQuery(IDbContext context)
        {
            if (context != null)
                _context = context;
            Name = "UsersQuery";

            Field<ListGraphType<UserType>>("getAll",
            resolve: context =>
            {
                return _context.Users.GetAll(FilterDefinition<User>.Empty);
            });

            Field<UserType>("getById",
            arguments: new QueryArguments
            {
               new  QueryArgument<StringGraphType> { Name = "id"}
            },
            resolve: context =>
            {
                var id = context.GetArgument<string>("id");
                var filter = Builders<User>.Filter.Eq(user => user.Id, id);
                return _context.Users.GetAll(filter).Result.FirstOrDefault();
            });

            Field<UserType>("getByNickname",
            arguments: new QueryArguments
            {
               new  QueryArgument<StringGraphType> { Name = "nickname"}
            },
            resolve: context =>
            {
                var nickname = context.GetArgument<string>("nickname");
                var filter = Builders<User>.Filter.Eq(user => user.Nickname, nickname );
                return _context.Users.GetAll(filter).Result.FirstOrDefault();
            });
        }
    }
}