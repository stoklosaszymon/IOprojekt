using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;
using System.ComponentModel.DataAnnotations;

namespace IOprojekt.Models
{
    public class Post
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonElement("postId")]
        public string PostId { get; set; }

        [BsonElement("userId")]
        public string UserId { get; set; }

        [BsonElement("body")]
        [BsonRepresentation(BsonType.String)]
        public string Body { get; set; }

        [BsonElement("createdAt")]
        [BsonRepresentation(BsonType.DateTime)]
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }

        [BsonElement("image")]
        [BsonRepresentation(BsonType.String)]
        public string Image { get; set; }
    }
}
