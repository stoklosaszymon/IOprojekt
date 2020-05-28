using GraphQL.Types;
using IOprojekt.Models;
using System;

namespace IOprojekt.GraphQLTypes
{
    public class CommentType : ObjectGraphType<Comment>
    {
        public CommentType()
        {
            Field(_ => _.CommentId);
            Field(_ => _.PostId);
            Field(_ => _.UserId);
            Field(_ => _.Body);
            Field(_ => _.Image);
            Field(_ => _.CreatedAt);
        }
    }
}
