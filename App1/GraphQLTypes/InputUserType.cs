using GraphQL.Types;
using IOprojekt.Models;
using System;

namespace IOprojekt.GraphQLTypes
{
    public class InputUserType : InputObjectGraphType<User>
    {
        public InputUserType()
        {
            Name = "InputUserType";
            Field(_ => _.Id);
            Field(_ => _.FirstName);
            Field(_ => _.LastName);
            Field(_ => _.Email);
            Field(_ => _.Gender);
            Field(_ => _.Locale);
        }
    }
}
