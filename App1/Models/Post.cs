using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Models
{
    public class Post
    {
        [BsonId]
        [BsonElement("postId")]
        [BsonRepresentation(BsonType.Int64)]
        public int PostId { get; set; }

        [BsonId]
        [BsonElement("postId")]
        [BsonRepresentation(BsonType.Int64)]
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
