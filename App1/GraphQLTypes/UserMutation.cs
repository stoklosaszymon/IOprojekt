using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;

namespace IOprojekt.GraphQLTypes
{
    public class UserMutation : ObjectGraphType
    {
        private readonly IDbContext _context;
        private readonly IHttpClientFactory _clientFactory;
        public UserMutation(IDbContext context, IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;

            if (context != null)
                _context = context;

            // Name = "UserMutation";

            Field<StringGraphType>("addUser",
                arguments: new QueryArguments
                {
                    new QueryArgument<StringGraphType>() { Name = "user" }
                },
                resolve: context =>
                {
                    var newUser = context.GetArgument<string>("user");
                    //newUser.CreatedAt = DateTime.Now;

                    //var filter = Builders<User>.Filter.Eq(user => user.Sub, newUser.Sub);
                    //var exist = _context.Users.GetAll(filter).Result.Count();
                    //return exist == 0 ? _context.Users.Add(newUser) : null;

                    var request = new HttpRequestMessage(HttpMethod.Get,
                         "https://dev-qvcdnn51.eu.auth0.com/userinfo");
                    request.Headers.Add("Authorization", $"Bearer {newUser}");


                    var client = _clientFactory.CreateClient();

                    var response = client.SendAsync(request);

                    var result = response.Result.Content.ReadAsStringAsync();

                    User m = JsonConvert.DeserializeObject<User>(result.Result);

                    return _context.Users.Add(m);
                }
             );

            Field<IntGraphType>("deleteUser",
                arguments: new QueryArguments
                {
                     new QueryArgument<IntGraphType>() { Name = "userId" }
                },
                resolve: context =>
                {
                    var id = context.GetArgument<string>("userId");
                    var builder = Builders<User>.Filter;
                    var filter = builder.Eq(user => user.Id, id);
                    return _context.Users.Delete(filter);
                }
             );

            Field<UserType>("updateUser",
               arguments: new QueryArguments
               {
                     new QueryArgument<InputUserType>() { Name = "user" }
               },
               resolve: context =>
               {
                   var user = context.GetArgument<User>("user");
                   var builder = Builders<User>.Filter;
                   var filter = builder.Eq(user => user.Id, user.Id);
                   var update = Builders<User>.Update
                                        .Set("firstName", user.FirstName)
                                        .Set("lastName", user.LastName);

                   return _context.Users.Update(filter, update);
               }
            );

        }
    }
}
