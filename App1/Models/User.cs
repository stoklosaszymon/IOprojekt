using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Models
{
    public class User
    {
        [BsonId]
        [BsonElement("id")]
        [BsonRepresentation(BsonType.Int64)]
        public int Id { get; set; }

        [BsonElement("firstName")]
        [BsonRepresentation(BsonType.String)]
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

        [BsonElement("idChat")]
        [BsonRepresentation(BsonType.String)]
        public string IdChat { get; set; }
    }
}
