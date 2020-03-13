using IOprojekt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Repositories
{
    public class UserRepository : IUserRepository
    {
        public List<User> GetAll()
        {
            return new List<User> {
                new User {
                    Id = 1,
                    FirstName = "Szymon",
                    LastName = "Stokłosa",
                    Locale = "Poland",
                    Gender = "M",
                    Email = "email@email.com",
                    CreatedAt = DateTime.Now
                }};
        }
    }
}
