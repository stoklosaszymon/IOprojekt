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
        public async Task JoinRoom (string name, string roomName)
        {
            await Groups.AddToGroupAsync(name, roomName);
        }

        public async Task SendMessageGroup (string name, string message, string roomName)
        {
            await Clients.Group(roomName).SendAsync("sendMessage", name, message);
        }
    }
}
