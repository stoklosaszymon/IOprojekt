using IOprojekt.Classes;
using IOprojekt.Contexts;
using IOprojekt.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Moq;
using System;
using Xunit;

namespace Bcknd_Tests
{
    public class MongoDbContextTests
    {
        public MongoDbContextTests()
        {
            _mockOptions = new Mock<IOptions<Mongosettings>>();
            _mockDB = new Mock<IMongoDatabase>();
            _mockClient = new Mock<IMongoClient>();
        }

        private Mock<IOptions<Mongosettings>> _mockOptions;

        private Mock<IMongoDatabase> _mockDB;

        private Mock<IMongoClient> _mockClient;

        [Fact]
        public void UserRepository_Constructor_Success()
        {
            var settings = new Mongosettings()
            {
                Connection = @"mongodb://tes123 ",
                DatabaseName = "TestDB"
            };

            _mockOptions.Setup(s => s.Value).Returns(settings);
            _mockClient.Setup(c => c
            .GetDatabase(_mockOptions.Object.Value.DatabaseName, null))
                .Returns(_mockDB.Object);

            //Act 
            var context = new MongoDBContext(_mockOptions.Object);

            //Assert 
            Assert.NotNull(context);
        }

        [Fact]
        public void MongoBookDBContext_GetCollection_NameEmpty_Failure()
        {

            //Arrange
            var settings = new Mongosettings()
            {
                Connection = "mongodb://tes123",
                DatabaseName = "TestDB"
            };

            _mockOptions.Setup(s => s.Value).Returns(settings);
            _mockClient.Setup(c => c
            .GetDatabase(_mockOptions.Object.Value.DatabaseName, null))
                .Returns(_mockDB.Object);

            //Act 
            var context = new MongoDBContext(_mockOptions.Object);
            var myCollection = context.GetCollection<User>("");

            //Assert 
            Assert.Null(myCollection);

        }

        [Fact]
        public void MongoBookDBContext_GetCollection_ValidName_Success()
        {
            //Arrange
            var settings = new Mongosettings()
            {
                Connection = "mongodb://tes123 ",
                DatabaseName = "TestDB"
            };

            _mockOptions.Setup(s => s.Value).Returns(settings);

            _mockClient.Setup(c => c.GetDatabase(_mockOptions.Object.Value.DatabaseName, null)).Returns(_mockDB.Object);

            //Act 
            var context = new MongoDBContext(_mockOptions.Object);
            var myCollection = context.GetCollection<User>("Book");

            //Assert 
            Assert.NotNull(myCollection);
        }
    }
}
