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
            Field(_ => _.FirstName, nullable: true);
            Field(_ => _.LastName, nullable: true);
            Field(_ => _.Nickname);
            Field(_ => _.Email);
            Field(_ => _.Gender);
            Field(_ => _.Locale, nullable: true);
            Field(_ => _.Sub);
            Field(_ => _.Picture);
            Field(_ => _.CreatedAt);
        }
    }
}
