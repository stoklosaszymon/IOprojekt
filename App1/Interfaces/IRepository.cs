using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Interfaces
{
    public interface IRepository<TEntity>
    {
        string CollectionName { get; }
    }
}
}
