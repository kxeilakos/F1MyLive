using Formula1MyLive.Configuration.Database;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization;
using System.IO;

namespace Formula1MyLive
{
	public class Startup
	{
		public IHostingEnvironment HostingEnvironment { get; }
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration, IHostingEnvironment environment)
		{
			this.Configuration = configuration;
			this.HostingEnvironment = environment;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<DatabaseConfiguration>(this.Configuration.GetSection("Database")).PostConfigure<DatabaseConfiguration>(o => o.Validate());
			services.AddDbContext<DbContextService>(options => options.UseSqlServer(this.Configuration.GetSection("Database:ConnectionString").Value));
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
			app.UseStaticFiles(new StaticFileOptions()
			{
				FileProvider = new PhysicalFileProvider(
							Path.Combine(Directory.GetCurrentDirectory(), @"Images")),
				RequestPath = new PathString("/app-images")
			});

			app.UseMvc(routes=> routes.MapRoute(name: "default", template: "{controller=values}/{action=Get}/{id?}"));
		}
	}
}
