using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using IOprojekt.Repositories;
using IOprojekt.GraphQLTypes;
using GraphQL;
using GraphQL.Types;
using GraphiQl;
using IOprojekt.Interfaces;
using IOprojekt.Factories;
using IOprojekt.Classes;
using IOprojekt.Contexts;
using Microsoft.Extensions.Options;

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

            
            services.Configure<MongoSettings>(options => Configuration.GetSection("Mongosettings").Bind(options));

            services.AddControllers();

            services.AddSingleton<IRepositoryFactory, RepositoryFactory>();
            services.AddSingleton<IMongoDatabaseFactory, MongoDatabaseFactory>();

            services.AddSingleton<IDbContext, DbContext>(serviceProvider =>
            {
                var options = serviceProvider.GetService<IOptions<MongoSettings>>();
                var repos = serviceProvider.GetService<IRepositoryFactory>();
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

            services.AddSingleton<IntGraphType>();


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


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
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
