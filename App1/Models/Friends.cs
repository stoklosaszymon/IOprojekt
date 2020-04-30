using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IOprojekt.Models
{
    public class Friends
    {
        [BsonElement("userId")]
        public string UserId { get; set; }

        [BsonElement("friendsList")]
        public List<string> FriendsList { get; set; }
    }
}
