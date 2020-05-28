using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Driver;
using System.Linq;

namespace IOprojekt.GraphQLTypes
{
    public class CommentQuery : ObjectGraphType
    {
        private readonly IDbContext _context;
        public CommentQuery(IDbContext context)
        {
            if (context != null)
                _context = context;
            Name = "CommentQuery";

            Field<ListGraphType<CommentType>>("GetByPostId",
            arguments: new QueryArguments
            {
               new  QueryArgument<StringGraphType> { Name = "postId"}
            },
            resolve: context =>
            {
                var postId = context.GetArgument<string>("postId");
                var filter = Builders<Comment>.Filter.Eq(comm => comm.PostId, postId);
                return _context.Comments.GetAll(filter).Result;
            });
        }
    }
}