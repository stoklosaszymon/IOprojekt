using GraphQL.Types;
using IOprojekt.Models;

namespace IOprojekt.GraphQLTypes
{
    public class InputCommentType : InputObjectGraphType<Comment>
    {
        public InputCommentType()
        {
            Name = "InputPostType";
            Field(_ => _.UserId);
            Field(_ => _.PostId);
            Field(_ => _.Body);
            Field(_ => _.Image, nullable: true);
        }
    }
}
