using Formula1MyLive.Database.Model;
using Formula1MyLive.Model;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Controllers
{
	[Route("api/results")]
	public class ResultsController: Controller
	{
		private readonly DbContextService _dbContextService;
		public ResultsController(DbContextService dbContextService)
		{	
			_dbContextService = dbContextService;
		}

		[HttpGet]
		public async Task<IEnumerable<Result>> Get()
		{
			IEnumerable<Result> circuits = await this._dbContextService.Result.ToListAsync();
			return circuits;
		}

	}
}
