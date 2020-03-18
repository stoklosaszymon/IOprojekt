using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Interfaces
{
    public interface IRepositoryFactory
    {
        IRepository<TEntity> Create<TEntity>(RepositoryOptions options);
    }
}
