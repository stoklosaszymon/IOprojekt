﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;
using System.ComponentModel.DataAnnotations;

namespace IOprojekt.Models
{
    public class User
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonElement("id")]
        public string Id { get; set; }

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

        [BsonElement("picture")]
        [BsonRepresentation(BsonType.String)]
        public string Picture { get; set; }

        [BsonElement("locale")]
        [BsonRepresentation(BsonType.String)]
        public string Locale { get; set; }

        [BsonElement("sub")]
        [BsonRepresentation(BsonType.String)]
        public string Sub { get; set; }

        [BsonElement("nickname")]
        [BsonRepresentation(BsonType.String)]
        public string Nickname { get; set; }

        [BsonElement("createdAt")]
        [BsonRepresentation(BsonType.DateTime)]
        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; }

        [BsonElement("idChat")]
        [BsonRepresentation(BsonType.String)]
        public string IdChat { get; set; }
    }
}
