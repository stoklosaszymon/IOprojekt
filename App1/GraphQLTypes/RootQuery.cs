using GraphQL.Types;
using IOprojekt.Repositories;

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
        }
    }
}