using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Interfaces
{
    public interface IRepository<TEntity>
    {
        string CollectionName { get; }

        TEntity Add(TEntity entity);
        //TEntity Delete(int id);
        //TEntity Update(TEntity entity);
        List<TEntity> GetAll(FilterDefinition<TEntity> filter);
    }
}

