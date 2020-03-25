using GraphQL.Types;
using IOprojekt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.GraphQLTypes
{
    public class PostType : ObjectGraphType<Post>
    {
        public PostType()
        {
            Field(_ => _.PostId);
            Field(_ => _.UserId);
            Field(_ => _.Body);
            Field(_ => _.CreatedAt).DefaultValue(DateTime.Now);
        }
        
    }
}
