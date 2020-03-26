using IOprojekt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Interfaces
{
    public interface IDbContext
    {
        IRepository<User> Users { get; }
        IRepository<Post> Posts { get; }

    }
}
