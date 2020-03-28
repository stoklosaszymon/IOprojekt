using GraphQL.Types;
using IOprojekt.Classes;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace IOprojekt.GraphQLTypes
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {

            Field<UserMutation>("users", resolve: context => new { });
            Field<PostMutation>("posts", resolve: context => new { });

        }
    }
}
