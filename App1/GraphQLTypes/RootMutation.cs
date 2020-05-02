using GraphQL.Types;

namespace IOprojekt.GraphQLTypes
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {

            Field<UserMutation>("users", resolve: context => new { });
            Field<PostMutation>("posts", resolve: context => new { });
            Field<FriendsMutation>("friends", resolve: context => new { });

        }
    }
}
