using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using IOprojekt.Models;
using IOprojekt.Utils;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using IOprojekt.Interfaces;

namespace IOprojekt.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly IMongoCollection<User> users;

        public UserRepository( IConfiguration config)
        {
            MongoClient client = new MongoClient(config.GetConnectionString("UsersDb"));
            IMongoDatabase database = client.GetDatabase("UsersDb");
            users = database.GetCollection<User>("Users");
        }

        public List<User> GetAll()
        {
            return users.Find(user => true).ToList();
        }

        public User AddUser( User user )
        {
            user.CreatedAt = DateTime.Now;
            users.InsertOne(user);
            return user;
        }

        public User RemoveUser( int id )
        {
            var foundUser = users.Find(user => user.Id == id).FirstOrDefault();
            if (foundUser != null)
            {
                users.DeleteOne(user => user.Id == id);
            }
            return foundUser;
        }

        public User UpdateUser( User user )
        {
           var foundUser = users.Find(user => user.Id == user.Id).FirstOrDefault();
            if ( foundUser != null) {
                Utilities.Assing(foundUser, user);
            }
            return foundUser;
        }
    }
}
