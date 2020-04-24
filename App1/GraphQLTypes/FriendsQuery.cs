using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Driver;
using System.Linq;

namespace IOprojekt.GraphQLTypes
{
    public class FriendsQuery : ObjectGraphType
    {
        private readonly IDbContext _context;
        public FriendsQuery(IDbContext context)
        {
            if (context != null)
                _context = context;

            Name = "FriendsQuery";

            Field<ListGraphType<UserType>>("GetFriendsByUserId",
            arguments: new QueryArguments
            {
               new  QueryArgument<IntGraphType> { Name = "userId"}
            },
            resolve: context =>
            {
                var id = context.GetArgument<int>("userId");
                var filter = Builders<Friends>.Filter.Eq(user => user.UserId, id);
                return _context.Friends.GetAll(filter).Result;
            });
        }
    }
}
