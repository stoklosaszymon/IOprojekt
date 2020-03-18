using IOprojekt.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public TEntity Add(TEntity entity)
        {
            _collection.InsertOne(entity);
            return entity;
        }
        public List<TEntity> GetAll(FilterDefinition<TEntity> filter)
        {
            return _collection.Find(filter).ToList();
        }
        //public TEntity Add(TEntity entity)
        //{
        //    _collection.InsertOne(entity);
        //    return entity;
        //}
        //public TEntity Add(TEntity entity)
        //{
        //    _collection.InsertOne(entity);
        //    return entity;
        //}
    }
}
