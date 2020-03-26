using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
