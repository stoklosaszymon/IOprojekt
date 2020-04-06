using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace IOprojekt.Models
{
    public class User
    {
        [BsonId]
        [BsonElement("id")]
        public int Id { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        [BsonRepresentation(BsonType.String)]
        public string LastName { get; set; }

        [BsonElement("email")]
        [BsonRepresentation(BsonType.String)]
        public string Email { get; set; }

        [BsonElement("gender")]
        [BsonRepresentation(BsonType.String)]
        public string Gender { get; set; }

        [BsonElement("locale")]
        [BsonRepresentation(BsonType.String)]
        public string Locale { get; set; }

        [BsonElement("createdAt")]
        [BsonRepresentation(BsonType.DateTime)]
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }
    }
}
