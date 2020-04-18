using IOprojekt.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Hubs
{
    public class ChatHub : Hub
    {
        private static ConcurrentDictionary<string, User> chatClients = new ConcurrentDictionary<string, User>();
        private static IList<string> chatRoom = new List<string>();
        public ConcurrentDictionary<string, User> Login(string name)
        {
            User newUser = new User { FirstName = name, IdChat = Context.ConnectionId };
            chatClients.TryAdd(name, newUser);
            return chatClients;
        }

        public Task SendMessageToUser(string fromName, string toName, string message)
        {
            var nameID = chatClients.Where(s => s.Key == toName).Select(s => s.Value.IdChat).First();
            Clients.Client(Context.ConnectionId).SendAsync("SendMessageToUser", fromName, message);
            return Clients.Client(nameID).SendAsync("SendMessageToUser", fromName, message);
        }
        public async Task CreateRoom(string roomName)
        {
            chatRoom.Add(roomName);
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public async Task AddUserRoom(string roomName, string addName)
        {
            var nameID = chatClients.Where(s => s.Key == addName).Select(s => s.Value.IdChat).First();
            await Groups.AddToGroupAsync(nameID, roomName);
        }

        public async Task SendMessageGroup (string name, string message, string roomName)
        {
            await Clients.Group(roomName).SendAsync("SendMessageGroup", name, message);
        }

        public async Task RemoveUserRoom(string roomName, string removeName)
        {
            var nameID = chatClients.Where(s => s.Key == removeName).Select(s => s.Value.IdChat).First();
            await Groups.RemoveFromGroupAsync(nameID, roomName);
        }

        //public async Task SendMessageToAll(string user, string message)
        //{
        //    await Clients.All.SendAsync("SendMessageToAll", user, message);
        //}

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }
    }
}
