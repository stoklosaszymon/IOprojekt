using IOprojekt.Interfaces;
using IOprojekt.Models;
using IOprojekt.Repositories;
using System;

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

            this.Users = repoFactory.Create<User>(new RepositoryOptions(connectionString, dbName, "Users"));
            this.Posts = repoFactory.Create<Post>(new RepositoryOptions(connectionString, dbName, "Posts"));
            this.Friends = repoFactory.Create<Friends>(new RepositoryOptions(connectionString, dbName, "Friends"));
            this.Comments = repoFactory.Create<Comment>(new RepositoryOptions(connectionString, dbName, "Comments"));

        }
        public IRepository<User> Users { get; private set; }
        public IRepository<Post> Posts { get; private set; }
        public IRepository<Friends> Friends { get; private set; }
        public IRepository<Comment> Comments { get; private set; }

    }
}
