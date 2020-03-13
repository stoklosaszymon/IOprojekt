using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOprojekt.Models
{
    public class GraphQLQueryDto
    {
        public string Query { get; set; }
        public string Variables { get; set; }
    }
}