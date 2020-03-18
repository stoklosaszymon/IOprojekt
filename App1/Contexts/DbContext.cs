using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Contexts
{
    public class DbContext : IDbContext
    {
        public DbContext(IRepositoryFactory repoFactory, string connectionString, string dbName)
        {
            if (string.IsNullOrWhiteSpace(connectionString)) 
                throw new ArgumentNullException("connectionString"); 
            if (string.IsNullOrWhiteSpace(dbName)) 
                throw new ArgumentNullException("dbName");
            
            this.Users = repoFactory.Create<User>(new RepositoryOptions(connectionString, dbName, "users")); 
            
        }
        public IRepository<User> Users { get; private set; }

    }
}
