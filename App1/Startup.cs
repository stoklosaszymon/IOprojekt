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
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using IOprojekt.Repositories;
using IOprojekt.GraphQLTypes;
using GraphQL;
using GraphQL.Types;
using GraphiQl;
using MongoDB.Driver;
using IOprojekt.Interfaces;
using IOprojekt.Classes;
using IOprojekt.Contexts;

namespace App1
{
    public class Startup
    {
        public IConfiguration Configuration { get; private set; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSpaStaticFiles(configuration => {
                configuration.RootPath = "client_app";
            });

            services.Configure<Mongosettings>(options => Configuration.GetSection("Mongosettings").Bind(options));

            services.AddControllers();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IDependencyResolver>(_ => new FuncDependencyResolver(_.GetRequiredService));
            services.AddScoped<ISchema, RootSchema>();
            services.AddScoped<RootQuery>();
            services.AddScoped<RootMutation>();

            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
            services.AddSingleton<UserType>();
            services.AddSingleton<InputUserType>();
            services.AddSingleton<IntGraphType>();

            services.AddSingleton<IMongoDBContext, MongoDBContext>();
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
