using IOprojekt.Repositories;

namespace IOprojekt.Interfaces
{
    public interface IRepositoryFactory
    {
        IRepository<TEntity> Create<TEntity>(RepositoryOptions options);
    }
}
