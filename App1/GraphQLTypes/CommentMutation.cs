using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Driver;
using System;

namespace IOprojekt.GraphQLTypes
{
    public class CommentMutation : ObjectGraphType
    {
        private readonly IDbContext _context;
        public CommentMutation(IDbContext context)
        {

            if (context != null)
                _context = context;

            Name = "CommentMutation";

            Field<PostType>("addComment",
                arguments: new QueryArguments
                {
                    new QueryArgument<InputPostType>() { Name = "comment" }
                },
                resolve: context =>
                {
                    var comment = context.GetArgument<Comment>("comment");
                    comment.CreatedAt = DateTime.Now;
                    return _context.Comments.Add(comment);
                }
             );
        }
    }
}
