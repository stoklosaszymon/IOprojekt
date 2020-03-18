using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Interfaces
{
    public interface IMongoDatabaseFactory
    {
        IMongoDatabase Connect(string connectionString, string dbName);
    }
}
