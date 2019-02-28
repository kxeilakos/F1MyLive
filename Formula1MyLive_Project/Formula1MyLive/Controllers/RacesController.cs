using Formula1MyLive.Database.Model;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Formula1MyLive.Controllers
{
	[Route("api/races")]
	public class RacesController: Controller
	{
		private readonly DbContextService _dbContextService;
		public RacesController(DbContextService dbContextService)
		{	
			_dbContextService = dbContextService;
		}

		[HttpGet]
		public async Task<IEnumerable<Race>> Get()
		{
			IEnumerable<Race> circuits = await this._dbContextService.Race.ToListAsync();
			return circuits;
		}

	}
}
