using GraphQL.Types;
using IOprojekt.Repositories;
using System.Linq;

namespace IOprojekt.GraphQLTypes
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery(IUserRepository _userRepository)
        {
            Field<ListGraphType<UserType>>("users", resolve: context =>
            {
                return _userRepository.GetAll();
            });

            Field<ListGraphType<UserType>>("users", arguments: new QueryArguments
            {
               new  QueryArgument<StringGraphType> { Name = "id"}
            },
            resolve: context =>
            {
                int id = context.GetArgument<int>("id");
                return _userRepository.GetAll().Where(_ => _.Id == id).ToList();
            });
        }
    }
}