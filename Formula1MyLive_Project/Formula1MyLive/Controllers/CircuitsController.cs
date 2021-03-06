﻿using Formula1MyLive.Database.Model;
using Formula1MyLive.Interfaces;
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
	[Route("api/circuits")]
	public class CircuitsController: Controller
	{
		private readonly DbContextService _dbContextService;
		private readonly ILoggerManager _logger;

		public CircuitsController(DbContextService dbContextService, ILoggerManager loggerManager)
		{	
			_dbContextService = dbContextService;
			_logger = loggerManager;
		}

		[HttpGet]
		public IActionResult Get()
		{
			try
			{
				IEnumerable<Circuit> circuits = this._dbContextService.Circuit;
				return Ok(circuits);
			}
			catch(Exception ex)
			{
				_logger.LogError("Internal server error" + ex.Message);
				return StatusCode(500, "Internal server error");
			}
		}

		[HttpGet("{year}")]
		public async Task<IEnumerable<Circuit>> GetCircuitsOfYear(int year)
		{
			_logger.LogInfo($"Querying Circuits of Year: {year.ToString()}");

			IEnumerable<Race> races = await this._dbContextService.Race.ToListAsync();
			IEnumerable<Race> racesOfYear = races.Where(x => x.Year == year).OrderBy(x=> x.Date);
			IEnumerable<Int16> circuitIds = racesOfYear.Select(x => x.CircuitId);

			IEnumerable<Circuit> circuits = await this._dbContextService.Circuit.ToListAsync();
			IEnumerable<Circuit> circuitsOfYear = circuits.Where(x => circuitIds.Contains(x.Id));

			return circuitsOfYear;
		}

	}
}
