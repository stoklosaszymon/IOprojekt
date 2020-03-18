using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Interfaces
{
    public interface IRepository<TEntity>
    {
        string CollectionName { get; }
        Task<long> CountAsync(FilterDefinition<TEntity> filter);
        IFindFluent<TEntity, TEntity> Find(FilterDefinition<TEntity> filter);
        IFindFluent<TEntity, TEntity> Find(Expression<Func<TEntity, bool>> filter);
        Task<TEntity> FindOneAndReplaceAsync(FilterDefinition<TEntity> filter, TEntity replacement);
        Task<TEntity> FindOneAndReplaceAsync(Expression<Func<TEntity, bool>> filter, TEntity replacement);
    }
}
}
