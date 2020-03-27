using IOprojekt.Classes;
using IOprojekt.Contexts;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Factories;
using IOprojekt.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;
using System.Linq.Expressions;
using IOprojekt.GraphQLTypes;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.Extensions.DependencyInjection;
using GraphQL;
using GraphQL.Types;
using IOprojekt.Controllers;

namespace Bcknd_Tests
{
    public class UserService {

        private readonly IRepository<User> _context;
        public UserService(IDbContext context)
        {
            _context = context.Users;
        }

        public void Add( User user)
        {
            _context.Add(user);
        }
    }
    public class UserRepositoryTests
    {

        [Fact]
        public async Task should_create_user_when_command_valid()
        {
            var command = new User
            {
                Id = 13,
                FirstName = "lorem",
                LastName = "ipsum"
            };

            var mockRepo = new Mock<IRepository<User>>();
            var mockDbContext = new Mock<IDbContext>();
            mockDbContext.Setup(db => db.Users).Returns(mockRepo.Object);

            var userHandler = new UserService(mockDbContext.Object);

            userHandler.Add(command);

            mockRepo.Verify(m => m.Add(It.IsAny<User>()), Times.Once());
        }
    }
}
