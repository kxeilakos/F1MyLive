using Formula1MyLive.Database.Model;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Formula1MyLive.Controllers
{
	[Route("api/statuses")]
	public class StatusesController: Controller
	{
		private readonly DbContextService _dbContextService;
		public StatusesController(DbContextService dbContextService)
		{	
			_dbContextService = dbContextService;
		}

		[HttpGet]
		public async Task<IEnumerable<Status>> Get()
		{
			IEnumerable<Status> circuits = await this._dbContextService.Status.ToListAsync();
			return circuits;
		}

	}
}
