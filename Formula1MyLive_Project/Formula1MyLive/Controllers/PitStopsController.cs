using Formula1MyLive.Database.Model;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Formula1MyLive.Controllers
{
	[Route("api/pitstops")]
	public class PitStopsController: Controller
	{
		private readonly DbContextService _dbContextService;
		public PitStopsController(DbContextService dbContextService)
		{	
			_dbContextService = dbContextService;
		}

		[HttpGet]
		public async Task<IEnumerable<PitStop>> Get()
		{
			IEnumerable<PitStop> circuits = await this._dbContextService.PitStop.ToListAsync();
			return circuits;
		}

	}
}
