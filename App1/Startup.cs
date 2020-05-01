using GraphiQl;
using GraphQL;
using GraphQL.Types;
using IOprojekt.Classes;
using IOprojekt.Contexts;
using IOprojekt.Factories;
using IOprojekt.GraphQLTypes;
using IOprojekt.Interfaces;
using IOprojekt.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using IOprojekt.Models;
using IOprojekt.Hubs;

namespace App1
{
    public class Startup
    {
        public IConfiguration Configuration { get; private set; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "client_app";
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = "https://dev-qvcdnn51.eu.auth0.com";
                options.Audience = "api.ioproject";
                
            });

            services.AddHttpClient();


            services.Configure<MongoSettings>(options => Configuration.GetSection("Mongosettings").Bind(options));

            services.AddControllers();

            services.AddSingleton<IMongoDatabaseFactory, MongoDatabaseFactory>();
            services.AddSingleton<IRepositoryFactory, RepositoryFactory>();

            services.AddSingleton<IDbContext, DbContext>(serviceProvider =>
            {
                var options = serviceProvider.GetService<IOptions<MongoSettings>>();
                var repos = serviceProvider.GetRequiredService<IRepositoryFactory>();
                var dbContext = new DbContext(repos, options.Value.ConnectionString, options.Value.DatabaseName);
                return dbContext;
            });

            services.AddScoped<IDependencyResolver>(_ => new FuncDependencyResolver(_.GetRequiredService));
            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();

            services.AddScoped<ISchema, RootSchema>();
            services.AddScoped<RootQuery>();
            services.AddScoped<RootMutation>();

            services.AddSingleton<UserType>();
            services.AddScoped<UserQuery>();
            services.AddSingleton<InputUserType>();
            services.AddScoped<UserMutation>();


            services.AddSingleton<PostType>();
            services.AddScoped<PostQuery>();
            services.AddSingleton<InputPostType>();
            services.AddScoped<PostMutation>();

            services.AddSingleton<FriendsType>();
            services.AddScoped<FriendsQuery>();
            services.AddScoped<FriendsMutation>();


            services.AddSingleton<IntGraphType>();

            services.AddSignalR();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();

            app.UseGraphiQl("/graphql");
            app.UseRouting();
            app.UseSpaStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                    endpoints.MapHub<ChatHub>("/chatHub");
            });


            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client_app";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
