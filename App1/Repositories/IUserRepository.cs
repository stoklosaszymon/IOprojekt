using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOprojekt.Models;

namespace IOprojekt.Repositories
{
        public interface IUserRepository
        {
            public List<User> GetAll();
        }
}
