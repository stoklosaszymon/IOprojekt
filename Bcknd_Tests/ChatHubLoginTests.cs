using IOprojekt.Hubs;
using IOprojekt.Models;
using IOprojekt.Utils;
using Microsoft.AspNetCore.SignalR;
using Moq;
using System;
using System.Collections.Concurrent;
using System.Linq;
using Xunit;

namespace Bcknd_Tests
{
    public class ChatHubLoginTests :Hub
    {
        [Fact]
        public void Login_iscalled_returnchatClients()
        {
            //Arrange
            var chatHub = new ChatHub();
            string firstName = "a";
            Mock<HubCallerContext> mockClientContext = new Mock<HubCallerContext>(); 
            mockClientContext.Setup(c => c.ConnectionId).Returns(Guid.NewGuid().ToString);

             //Act
             var  chatClients = chatHub.Login(firstName);

            //Assert
            Assert.Equal(firstName, chatClients.Select(x => x.Value.FirstName).First()); 
            Assert.Equal(firstName, chatClients.Select(x => x.Key).First());
            Assert.IsType<ConcurrentDictionary<string, User>>(chatClients);
            

        }

    }
}