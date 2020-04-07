using GraphQL.Types;
using IOprojekt.Models;
using System;

namespace IOprojekt.GraphQLTypes
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Field(_ => _.Id);
            Field(_ => _.FirstName);
            Field(_ => _.LastName);
            Field(_ => _.Email);
            Field(_ => _.Gender);
            Field(_ => _.Locale);
        }
    }
}
