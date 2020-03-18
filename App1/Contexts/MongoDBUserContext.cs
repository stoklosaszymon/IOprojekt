﻿public class MongoBookDBContext : IMongoBookDBContext
{
    private IMongoDatabase _db { get; set; }
    private MongoClient _mongoClient { get; set; }
    public IClientSessionHandle Session { get; set; }

    public MongoBookDBContext(IOptions<Mongosettings> configuration)
    {
        _mongoClient = new MongoClient(configuration.Value.Connection);

        _db = _mongoClient.GetDatabase(configuration.Value.DatabaseName);
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