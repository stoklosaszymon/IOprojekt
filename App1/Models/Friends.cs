using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;
using System.ComponentModel.DataAnnotations;

namespace IOprojekt.Models
{
    public class Friends
    {
        [BsonElement("userId")]
        public int UserId { get; set; }

        [BsonElement("friendsList")]
        public BsonArray FriendsList { get; set; }
    }
}
