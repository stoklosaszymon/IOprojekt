using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace IOprojekt.Hubs
{
    public class ChatHub : Hub
    {
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
            await Clients.Group(roomName).SendAsync("sendMessage", name, message);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }
    }
}
