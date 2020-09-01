using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Driver;
using System;

namespace IOprojekt.GraphQLTypes
{
    public class PostMutation : ObjectGraphType
    {
        private readonly IDbContext _context;
        public PostMutation(IDbContext context)
        {

            if (context != null)
                _context = context;

            Name = "PostMutation";

            Field<PostType>("addPost",
                arguments: new QueryArguments
                {
                    new QueryArgument<InputPostType>() { Name = "post" }
                },
                resolve: context =>
                {
                    var post = context.GetArgument<Post>("post");
                    post.CreatedAt = DateTime.Now;
                    return _context.Posts.Add(post);
                }
             );

            Field<IntGraphType>("deletePost",
                arguments: new QueryArguments
                {
                     new QueryArgument<StringGraphType>() { Name = "postId" }
                },
                resolve: context =>
                {
                    var id = context.GetArgument<string>("postId");
                    var builder = Builders<Post>.Filter;
                    var filter = builder.Eq(post => post.PostId, id);
                    return _context.Posts.Delete(filter);
                }
             );

            Field<PostType>("updatePost",
               arguments: new QueryArguments
               {
                     new QueryArgument<StringGraphType>() { Name = "post" },
                     new QueryArgument<StringGraphType>() { Name = "body" }
               },
               resolve: context =>
               {
                   var postId = context.GetArgument<string>("post");
                   var body = context.GetArgument<string>("body");
                   var builder = Builders<Post>.Filter;
                   var filter = builder.Eq(p => p.PostId, postId);
                   var update = Builders<Post>.Update
                                        .Set("body", body);

                   return _context.Posts.Update(filter, update);
               }
            );

        }
    }
}
