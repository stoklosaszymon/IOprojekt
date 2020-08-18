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
        private static ConcurrentDictionary<string, string> chatRoom = new ConcurrentDictionary<string, string>();
        public ConcurrentDictionary<string, User> Login(string name)
        {
            User newUser = new User { FirstName = name, IdChat = Context.ConnectionId };
            chatClients.TryAdd(name, newUser);
            return chatClients;
        }

        public Task SendMessageToUser(string toName, string yourname, string message, string firstName, string lastName)
        {
            var nameID = chatClients.Where(s => s.Key == toName).Select(s => s.Value.IdChat).First();
            Clients.Client(Context.ConnectionId).SendAsync("SendMessageToUser", firstName, lastName, message, yourname, toName);
            return Clients.Client(nameID).SendAsync("SendMessageToUser", firstName, lastName, message, yourname, toName);
        }
        public async Task CreateRoom(string roomName)
        {
            chatRoom.TryAdd(Context.ConnectionId, roomName);
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public async Task AddUserRoom(string roomName, string addName)
        {
            var nameID = chatClients.Where(s => s.Key == addName).Select(s => s.Value.IdChat).First();
            chatRoom.TryAdd(nameID, roomName);
            await Groups.AddToGroupAsync(nameID, roomName);
            await Clients.Client(nameID).SendAsync("SendNameGroup", roomName);
        }

        public async Task SendMessageGroup(string name, string message, string roomName, string firstName, string lastName)
        {
            var nameID = chatClients.Where(s => s.Key == name).Select(s => s.Value.IdChat).First();
            var q = chatRoom.Select(x => x).Where(x => x.Key == nameID && x.Value == roomName).First();
            if (q.Key == nameID && q.Value == roomName)
            {
                await Clients.Group(roomName).SendAsync("SendMessageGroup", firstName, lastName, message, roomName);
            }

        }

        public async Task RemoveUserRoom(string roomName, string removeName)
        {
            var nameID = chatClients.Where(s => s.Key == removeName).Select(s => s.Value.IdChat).First();
            chatRoom.TryRemove(nameID, out roomName);
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
