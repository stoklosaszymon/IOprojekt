using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;

namespace IOprojekt.GraphQLTypes
{
    public class PostQuery : ObjectGraphType
    {
        private readonly IRepository<Post> posts;
        public PostQuery(IDbContext context)
        {
            if (context != null)
                posts = context.Posts;
            Name = "PostsQuery";

            Field<ListGraphType<PostType>>("getAll",
            resolve: context =>
            {
                return posts.GetAll(FilterDefinition<Post>.Empty);
            });

            Field<UserType>("GetByUserId",
            arguments: new QueryArguments
            {
               new  QueryArgument<IntGraphType> { Name = "userId"}
            },
            resolve: context =>
            {
                var id = context.GetArgument<int>("userId");
                var filter = Builders<Post>.Filter.Eq(post => post.UserId, id);
                return posts.GetAll(filter).Result.FirstOrDefault();
            });

            Field<UserType>("GetById",
            arguments: new QueryArguments
            {
                new  QueryArgument<IntGraphType> { Name = "postId"}
            },
            resolve: context =>
            {
                var id = context.GetArgument<int>("postId");
                var filter = Builders<Post>.Filter.Eq(post => post.UserId, id);
                return posts.GetAll(filter).Result.FirstOrDefault();
            });
        }
    }
}