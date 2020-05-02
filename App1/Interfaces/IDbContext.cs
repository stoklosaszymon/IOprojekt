using IOprojekt.Models;

namespace IOprojekt.Interfaces
{
    public interface IDbContext
    {
        IRepository<User> Users { get; }
        IRepository<Post> Posts { get; }
        IRepository<Friends> Friends { get; }
    }
}
