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
	[Route("api/constructors")]
	public class ConstructorsController: Controller
	{
		private readonly DbContextService _dbContextService;
		public ConstructorsController(DbContextService dbContextService)
		{	
			_dbContextService = dbContextService;
		}

		[HttpGet]
		public async Task<IEnumerable<Constructor>> Get()
		{
			IEnumerable<Constructor> Constructors = await this._dbContextService.Constructor.ToListAsync();
			return Constructors;
		}

		[HttpPost]
		public IEnumerable<Constructor> GetConstructorsOfCircuit([FromBody]Request request)
		{
			IEnumerable<Race> races = this._dbContextService.Race.ToList();

			IEnumerable<Race> racesOfCircuit = races.Where(x => x.CircuitId == request.CircuitId && x.Year == request.Year).OrderBy(x => x.Date);
			IEnumerable<Int16> raceIdsOfCircuit = racesOfCircuit.Select(x => x.Id);

			IEnumerable<Result> resultsOfRace = this._dbContextService.Result.ToList().Where(x => raceIdsOfCircuit.Contains(x.RaceId));

			IEnumerable<Int16> driverIdsIds = resultsOfRace.Select(x => x.ConstructorId).ToList();

			IEnumerable<Constructor> constructors = this._dbContextService.Constructor.ToList();
			IEnumerable<Constructor> driversOfCircuitOfYear = constructors.Where(x => driverIdsIds.Contains(x.Id)).OrderBy(x => x.Name);

			return driversOfCircuitOfYear;
		}

	}
}
