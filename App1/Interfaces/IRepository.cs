using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IOprojekt.Interfaces
{
    public interface IRepository<TEntity>
    {
        string CollectionName { get; }

        public Task<TEntity> Add(TEntity entity);

        public Task<IEnumerable<TEntity>> GetAll(FilterDefinition<TEntity> filter);

        public Task<TEntity> Delete(FilterDefinition<TEntity> filter);

        public Task<TEntity> Update(FilterDefinition<TEntity> filter,
                                           UpdateDefinition<TEntity> udate);
    }
}

