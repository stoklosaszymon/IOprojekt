using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOprojekt.Models;

namespace IOprojekt.Interfaces
{
        public interface IUserRepository
        {
            public List<User> GetAll();
            public User AddUser(User user);
            public User RemoveUser(int id);
            public User UpdateUser(User user);
        }
}
