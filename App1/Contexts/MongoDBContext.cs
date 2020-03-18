using IOprojekt.Classes;
using IOprojekt.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace IOprojekt.Contexts
{

    public class MongoDBContext : IMongoDBContext
    {
        private readonly IMongoDatabase _db = null;

        public MongoDBContext(IOptions<Mongosettings> configuration)
        {
           var client = new MongoClient(configuration.Value.Connection);
           if (client != null)
                _db = client.GetDatabase(configuration.Value.DatabaseName);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return null;
            }
            return _db.GetCollection<T>(name);
        }
    }
}