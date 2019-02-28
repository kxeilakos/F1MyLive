using Formula1MyLive.Database.Model;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Controllers
{
	[Route("api/seasons")]
	public class SeasonsController : Controller
	{
		private readonly DbContextService  _dbContextService;
		public SeasonsController(DbContextService dbContextService)
		{
			_dbContextService = dbContextService;
		}

		[HttpGet]
		public async Task<IEnumerable<Season>> Get()
		{
			IEnumerable<Season> seasons = await  this._dbContextService.Season.ToListAsync();
			return seasons.Where(x=> x.Year>=2010);	
		}

		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}
	}
}
