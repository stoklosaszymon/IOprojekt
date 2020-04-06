using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace IOprojekt.Models
{
    public class Post
    {
        [BsonId]
        [BsonElement("postId")]
        public int PostId { get; set; }

        [BsonElement("userId")]
        public int UserId { get; set; }

        [BsonElement("body")]
        [BsonRepresentation(BsonType.String)]
        public string Body { get; set; }

        [BsonElement("createdAt")]
        [BsonRepresentation(BsonType.DateTime)]
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
    }
}
