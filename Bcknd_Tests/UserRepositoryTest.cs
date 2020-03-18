using Moq;
using System;
using Xunit;

namespace Bcknd_Tests
{
    public class UserRepositoryTest
    {
        private Mock<IOptions<Mongosettings>> _mockOptions;

        private Mock<IMongoDatabase> _mockDB;

        private Mock<IMongoClient> _mockClient;

        [Fact]
        public void Test1()
        {

        }
    }
}
