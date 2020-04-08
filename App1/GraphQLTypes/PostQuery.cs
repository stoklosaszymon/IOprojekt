﻿using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Driver;
using System.Linq;

namespace IOprojekt.GraphQLTypes
{
    public class PostQuery : ObjectGraphType
    {
        private readonly IDbContext _context;
        public PostQuery(IDbContext context)
        {
            if (context != null)
                _context = context;
            Name = "PostsQuery";

            Field<ListGraphType<PostType>>("getAll",
            resolve: context =>
            {
                return _context.Posts.GetAll(FilterDefinition<Post>.Empty);
            });

            Field<ListGraphType<PostType>>("GetByUserId",
            arguments: new QueryArguments
            {
               new  QueryArgument<IntGraphType> { Name = "userId"}
            },
            resolve: context =>
            {
                var id = context.GetArgument<int>("userId");
                var filter = Builders<Post>.Filter.Eq(post => post.UserId, id);
                return _context.Posts.GetAll(filter).Result;
            });

            Field<PostType>("GetById",
            arguments: new QueryArguments
            {
                new  QueryArgument<IntGraphType> { Name = "postId"}
            },
            resolve: context =>
            {
                var id = context.GetArgument<int>("postId");
                var filter = Builders<Post>.Filter.Eq(post => post.UserId, id);
                return _context.Posts.GetAll(filter).Result.FirstOrDefault();
            });
        }
    }
}