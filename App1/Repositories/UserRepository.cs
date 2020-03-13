using IOprojekt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Repositories
{
    public class UserRepository : IUserRepository
    {
        static private List<User> _users = new List<User> {
                new User {
                    Id = 1,
                    FirstName = "Szymon",
                    LastName = "Stokłosa",
                    Locale = "Poland",
                    Gender = "M",
                    Email = "email@email.com",
                    CreatedAt = DateTime.Now
                }};

        public List<User> GetAll()
        {
            return _users;
        }

        public User AddUser( User user)
        {
            user.Id = _users.Max(_ => _.Id) + 1;
            _users.Add(user);
            return user;
        }
    }
}
