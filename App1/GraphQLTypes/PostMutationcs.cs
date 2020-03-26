﻿using GraphQL.Types;
using IOprojekt.Classes;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace IOprojekt.GraphQLTypes
{
    public class PostMutation : ObjectGraphType
    {
        private readonly IRepository<Post> posts;
        public PostMutation(IDbContext context)
        {

            if (context != null)
                posts = context.Posts;

            Name = "PostMutation";

            Field<PostType>("addPost",
                arguments: new QueryArguments
                {
                    new QueryArgument<InputPostType>() { Name = "post" }
                },
                resolve: context =>
                {
                    var post = context.GetArgument<Post>("post");
                    return posts.Add(post);
                }
             );

            Field<IntGraphType>("deletePost",
                arguments: new QueryArguments
                {
                     new QueryArgument<IntGraphType>() { Name = "postId" }
                },
                resolve: context =>
                {
                    var id = context.GetArgument<int>("postId");
                    var builder = Builders<Post>.Filter;
                    var filter = builder.Eq(post => post.PostId, id);
                    return posts.Delete(filter);
                }
             );

            Field<PostType>("updatePost",
               arguments: new QueryArguments
               {
                     new QueryArgument<InputPostType>() { Name = "Post" }
               },
               resolve: context =>
               {
                   var post = context.GetArgument<Post>("Post");
                   var builder = Builders<Post>.Filter;
                   var filter = builder.Eq(p => p.PostId, post.PostId);
                   var update = Builders<Post>.Update
                                        .Set("body", post.Body);

                   return posts.Update(filter, update);
               }
            );

        }
    }
}
