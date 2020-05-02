using System;
using GraphQL.Types;
using IOprojekt.Models;


namespace IOprojekt.GraphQLTypes
{
    public class FriendsType : ObjectGraphType<Friends>
    {
        public FriendsType()
        {
            Field(_ => _.UserId);
            Field(_ => _.FriendsList);
        }
    }
}
