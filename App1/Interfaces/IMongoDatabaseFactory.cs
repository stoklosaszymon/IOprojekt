using MongoDB.Driver;

namespace IOprojekt.Interfaces
{
    public interface IMongoDatabaseFactory
    {
        IMongoDatabase Connect(string connectionString, string dbName);
    }
}
