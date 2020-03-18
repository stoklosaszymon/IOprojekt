using MongoDB.Driver;

namespace IOprojekt.Interfaces
{
    public interface IMongoDBContext
    {
        public IMongoCollection<T> GetCollection<T>(string name);
    }
}
