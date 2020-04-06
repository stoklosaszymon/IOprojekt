using GraphQL.Types;
using IOprojekt.Models;

namespace IOprojekt.GraphQLTypes
{
    public class InputPostType : InputObjectGraphType<Post>
    {
        public InputPostType()
        {
            Name = "InputPostType";
            Field(_ => _.PostId);
            Field(_ => _.UserId);
            Field(_ => _.Body);
        }
    }
}
