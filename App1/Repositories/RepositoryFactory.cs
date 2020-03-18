using IOprojekt.Classes;
using IOprojekt.Interfaces;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Repositories
{
    public class RepositoryFactory : IRepositoryFactory
    {
        private readonly IMongoDatabaseFactory _dbFactory;
        public RepositoryFactory(IMongoDatabaseFactory dbFactory)
        {
            if (dbFactory == null) throw new ArgumentNullException("dbFactory");
            _dbFactory = dbFactory;
        }
        public IRepository<TEntity> Create<TEntity>(IOptions<Mongosettings> options)
        {
            if (options == null) throw new ArgumentNullException("options");
            var db = _dbFactory.Connect(options.Value.ConnectionString, options.Value.DatabaseName);
            return new Repository<TEntity>(db.GetCollection<TEntity>(options.Value.CollectionName));
        }
    }
}
