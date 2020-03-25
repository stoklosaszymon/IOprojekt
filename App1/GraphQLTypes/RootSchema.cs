using GraphQL;
using GraphQL.Types;

namespace IOprojekt.GraphQLTypes
{
    public class RootSchema : Schema, ISchema
    {
        public RootSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<UserQuery>();
            Mutation = resolver.Resolve<RootMutation>();
        }
    }
}
