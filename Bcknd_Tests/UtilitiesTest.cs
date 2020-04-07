using IOprojekt.Models;
using IOprojekt.Utils;
using Xunit;

namespace Bcknd_Tests
{
    public class UtilitiesTest
    {
        [Fact]
        public void Assign_BothObjectsHaveTheSamePropertyValue()
        {
            User obj1 = new User { FirstName = "John", LastName = "Bravo" };
            User obj2 = new User { FirstName = "James", LastName = "Bond" };

            Utilities.Assing(obj1, obj2);
            var expect = new User { FirstName = "James", LastName = "Bond" };


            Assert.Equal(expect.FirstName, obj1.FirstName);
            Assert.Equal(expect.LastName, obj1.LastName);
            Assert.Equal(expect.Id, obj1.Id);
        }

        [Fact]
        public void Assign_BothObjectsAreTheSameType()
        {
            User obj1 = new User { FirstName = "John", LastName = "Bravo" };
            User obj2 = new User { FirstName = "James", LastName = "Bond" }; ;

            Utilities.Assing(obj1, obj2);

            Assert.IsType<User>(obj1);
            Assert.IsType(obj2.GetType(), obj1);
        }

        [Fact]
        public void Assign_ObjectsAreNotReferenceEqual()
        {
            User obj1 = new User { FirstName = "John", LastName = "Bravo" };
            User obj2 = new User { FirstName = "James", LastName = "Bond" };

            Utilities.Assing(obj1, obj2);

            Assert.NotEqual(obj1, obj2);
        }
    }
}