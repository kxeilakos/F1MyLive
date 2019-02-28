using Formula1MyLive.Database.Model;
using Formula1MyLive.Model;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Formula1MyLive.Controllers
{
	[Route("api/drivers")]
	public class DriversController : Controller
	{
		private readonly DbContextService  _dbContextService;
		public DriversController(DbContextService dbContextService)
		{
			_dbContextService = dbContextService;
		}

		[HttpGet]
		public async Task<IEnumerable<Driver>> Get()
		{
			IEnumerable<Driver> Drivers = await  this._dbContextService.Driver.ToListAsync();
			return Drivers;	
		}

		[HttpPost]
		public IEnumerable<Driver> GetDriversOfCircuit([FromBody]Request request)
		{
			IEnumerable<Race> races =  this._dbContextService.Race.ToList();

			IEnumerable<Race> racesOfCircuit = races.Where(x => x.CircuitId == request.CircuitId && x.Year == request.Year).OrderBy(x => x.Date);
			IEnumerable<Int16> raceIdsOfCircuit = racesOfCircuit.Select(x => x.Id);

			IEnumerable<Result> resultsOfRace = this._dbContextService.Result.ToList().Where(x => raceIdsOfCircuit.Contains(x.RaceId));

			IEnumerable<Int16> driverIdsIds = resultsOfRace.Select(x => x.DriverId).ToList();

			IEnumerable<Driver> drivers =  this._dbContextService.Driver.ToList();
			IEnumerable<Driver> driversOfCircuitOfYear = drivers.Where(x => driverIdsIds.Contains(x.Id)).OrderBy(x=> x.LastName);

			return driversOfCircuitOfYear;
		}
	}
}
