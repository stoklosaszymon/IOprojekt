using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using IOprojekt.Models;
using IOprojekt.Utils;

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

        public User AddUser( User user )
        {
            user.CreatedAt = DateTime.Now;
            _users.Add(user);
            return user;
        }

        public User RemoveUser( int id )
        {
            var foundUser = _users.Find(user => user.Id == id);
            if (foundUser != null)
            {
                _users.Remove(foundUser);
            }
            return foundUser;
        }

        public User UpdateUser( User user )
        {
           var foundUser = _users.First(_ => _.Id == user.Id);
            if ( foundUser != null) {
                Utilities.Assing(foundUser, user);
            }
            return foundUser;
        }
    }
}
