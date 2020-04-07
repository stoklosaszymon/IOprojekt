using IOprojekt.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IOprojekt.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
    {
        private readonly IMongoCollection<TEntity> _collection;

        public Repository(IMongoCollection<TEntity> collection)
        {
            if (null == collection)
                throw new ArgumentNullException("collection");
            _collection = collection;

            this.CollectionName = collection.CollectionNamespace.CollectionName;
        }

        public string CollectionName { get; private set; }

        public async Task<TEntity> Add(TEntity entity)
        {
            await _collection.InsertOneAsync(entity);
            return entity;
        }
        public async Task<IEnumerable<TEntity>> GetAll(FilterDefinition<TEntity> filter)
        {
            return await _collection.Find(filter).ToListAsync();
        }
        public async Task<TEntity> Delete(FilterDefinition<TEntity> filter)
        {
            var foundUser = await _collection.FindOneAndDeleteAsync(filter);
            return foundUser;
        }
        public async Task<TEntity> Update(FilterDefinition<TEntity> filter,
                                          UpdateDefinition<TEntity> update)
        {
            var entity = await _collection.FindOneAndUpdateAsync(filter, update);
            return entity;
        }
    }
}
