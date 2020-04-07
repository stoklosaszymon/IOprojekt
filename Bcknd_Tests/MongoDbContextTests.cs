using IOprojekt.Classes;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Moq;
using Xunit;

namespace Bcknd_Tests
{
    public class MongoDbContextTests
    {
        private Mock<IOptions<MongoSettings>> _mockOptions;
        private Mock<IMongoDatabase> _mockDB;
        private Mock<IMongoClient> _mockClient;
        public MongoDbContextTests()
        {
            _mockOptions = new Mock<IOptions<MongoSettings>>();
            _mockDB = new Mock<IMongoDatabase>();
            _mockClient = new Mock<IMongoClient>();
        }

        [Fact]
        public void UserRepository_Constructor_Success()
        {

        }

        [Fact]
        public void MongoBookDBContext_GetCollection_NameEmpty_Failure()
        {


        }

        [Fact]
        public void MongoBookDBContext_GetCollection_ValidName_Success()
        {

        }
    }
}
