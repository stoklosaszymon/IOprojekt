using IOprojekt.Classes;
using IOprojekt.Contexts;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace Bcknd_Tests
{
    public class UserRepositoryTests
    {
        public UserRepositoryTests()
        {
            _mockOptions = new Mock<IOptions<Mongosettings>>();
            _mockDB = new Mock<IMongoDatabase>();
            _mockClient = new Mock<IMongoClient>();
        }

        private Mock<IOptions<Mongosettings>> _mockOptions;

        private Mock<IMongoDatabase> _mockDB;

        private Mock<IMongoClient> _mockClient;

        [Fact]
        public void MongoBookDBContext_GetCollection_NameEmpty_Failure()
        {

           

        }
    }
}
