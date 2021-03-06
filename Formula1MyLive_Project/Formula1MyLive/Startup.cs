﻿using Formula1MyLive.Configuration;
using Formula1MyLive.Interfaces;
using Formula1MyLive.Middleware;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using System;
using System.IO;

namespace Formula1MyLive
{
	public class Startup
	{
		public IHostingEnvironment HostingEnvironment { get; }
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration, IHostingEnvironment environment, ILoggerFactory loggerFactory)
		{
			NLog.LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
			this.Configuration = configuration;
			this.HostingEnvironment = environment;

		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<DatabaseConfiguration>(this.Configuration.GetSection("Database")).PostConfigure<DatabaseConfiguration>(o => o.Validate());
			services.AddSingleton<AppConfigurationService>();
			services.AddDbContext<DbContextService>(options => options.UseSqlServer(this.Configuration.GetSection("Database:ConnectionString").Value));
			services.AddSingleton<ILoggerManager, LoggerManagerService>();
			services.AddMvc()
				.AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());
		}	

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			DefaultFilesOptions options = new DefaultFilesOptions();
			options.DefaultFileNames.Clear();
			options.DefaultFileNames.Add("startup.html");
			app.UseDefaultFiles(options);

			app.UseStaticFiles();
			app.UseMiddleware<ExceptionMiddleware>();
			app.UseMvc(routes=> routes.MapRoute(name: "default", template: "{controller=values}/{action=Get}/{id?}"));
		}
	}
}
