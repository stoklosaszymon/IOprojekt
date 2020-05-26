using GraphQL.Types;
using IOprojekt.Interfaces;
using IOprojekt.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
                    new QueryArgument<StringGraphType>() { Name = "token" }
                },
                resolve: context =>
                {
                    var token = context.GetArgument<string>("token");

                    var request = new HttpRequestMessage(HttpMethod.Get,
                         "https://dev-qvcdnn51.eu.auth0.com/userinfo");
                    request.Headers.Add("Authorization", $"Bearer {token}");


                    var client = _clientFactory.CreateClient();
                    var response = client.SendAsync(request);
                    var result = response.Result.Content.ReadAsStringAsync();


                    Auth0User m = JsonConvert.DeserializeObject<Auth0User>(result.Result);

                    var newUser = new User
                    {
                        Email = m.email,
                        FirstName = m.given_name,
                        LastName = m.family_name,
                        Locale = m.locale,
                        Sub = m.sub,
                        Nickname = m.nickname,
                        Picture = m.picture,
                        CreatedAt = DateTime.Now
                    };

                    var builder = Builders<User>.Filter;
                    var filter = builder.Eq(user => user.Sub, newUser.Sub);
                    var found =_context.Users.FindOne(filter).Result;

                    if ( found == null )
                    {
                        var createdUser = _context.Users.Add(newUser);

                        _context.Friends.Add(new Friends
                        {
                            UserId = createdUser.Result.Id,
                            FriendsList = new List<string>()
                        });
                        return createdUser;
                    } 
                    else
                    {
                        return found;
                    }
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
