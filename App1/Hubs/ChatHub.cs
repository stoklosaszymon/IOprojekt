﻿using IOprojekt.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Hubs
{
    public class ChatHub : Hub
    {
        private static ConcurrentDictionary<string, User> chatClients = new ConcurrentDictionary<string, User>();

        public ConcurrentDictionary<string, User> Login(string name)
        {
            User newUser = new User { FirstName = name, IdChat = Context.ConnectionId };
            chatClients.TryAdd(name, newUser);
            return chatClients;
        }

        public Task SendMessageToUser(string fromName, string toName, string message)
        {
            var nameID = chatClients.Where(s => s.Key == toName).Select(s => s.Value.ID).First();
            Clients.Client(Context.ConnectionId).SendAsync("SendMessageToUser", fromName, message);
            return Clients.Client(nameID).SendAsync("SendMessageToUser", fromName, message);
        }

        public async Task SendMessageToAll(string user, string message)
        {
            await Clients.All.SendAsync("SendMessageToAll", user, message);
        }

        public Task SendMessageToCaller(string message)
        {
            return Clients.Caller.SendAsync("ReceiveMessage", message);
        }
        public Task SendMessageToUser(string connectionId, string message)
        {
            return Clients.Client(connectionId).SendAsync("ReceiveMessage", message);
        }
        public async Task JoinRoom ( string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public async Task SendMessageGroup (string name, string message, string roomName)
        {
            await Clients.Group(roomName).SendAsync("SendMessageGroup", name, message);
        }

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
