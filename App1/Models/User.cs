using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Models
{
    public class User
    {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Gender { get; set; }
            public string Locale { get; set; }

            [DataType(DataType.Date)]
            public DateTime CreatedAt { get; set; }
    }
}
