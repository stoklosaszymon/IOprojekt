using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Models
{
    public class Auth0User
    {
        public string given_name { get; set; }
        public string family_name { get; set; }

        public string locale { get; set; }
        public string email { get; set; }
        public string sub { get; set; }
        public string nickname { get; set; }
        public string picture { get; set; }
    }
}
