using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace IOprojekt.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage (string user, string message)
        {
            await Clients.All.SendAsync("SendMessage", user, message);
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
