using GraphQL.Types;

namespace IOprojekt.GraphQLTypes
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Name = "Query";
            Field<UserQuery>("users", resolve: context => new { });
            Field<PostQuery>("posts", resolve: context => new { });

        }
    }
}
