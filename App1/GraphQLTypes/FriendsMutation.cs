using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Driver;
using System;

namespace IOprojekt.GraphQLTypes
{
    public class FriendsMutation : ObjectGraphType
    {
        private readonly IDbContext _context;
        public FriendsMutation(IDbContext context)
        {
            if (context != null)
                _context = context;

            Name = "FriendsMutation";

            Field<FriendsType>("addFriend",
                arguments: new QueryArguments
                {
                    new QueryArgument<StringGraphType>() { Name = "userId" },
                    new QueryArgument<StringGraphType>() { Name = "friendId" }
                },
                resolve: context =>
                {
                    var userId = context.GetArgument<string>("userId");
                    var friendId = context.GetArgument<string>("friendId");

                    var builder = Builders<Friends>.Filter;
                    var filter = builder.Eq(user => user.UserId, userId);

                    var update = Builders<Friends>.Update
                                         .Push<String>("friendsList", friendId);

                    return _context.Friends.Update(filter, update);
                }
             );
        }
    }
}
