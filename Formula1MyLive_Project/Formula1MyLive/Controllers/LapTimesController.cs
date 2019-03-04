using Formula1MyLive.Database.Model;
using Formula1MyLive.Model;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Formula1MyLive.Controllers
{
	[Route("api/laptimes")]
	public class LapTimesController: Controller
	{
		private readonly DbContextService _dbContextService;
		private Dictionary<Int16, Constructor> Constructors { get; set; }
		private Dictionary<Int16, Driver> Drivers { get; set; }
		private Dictionary<Int16, Status> Statuses { get; set; }
		private List<Result> Results { get; set; }
		private List<PitStop> Pitstops { get; set; }

		Dictionary<short, IOrderedEnumerable<LapTimeWithQualifiersAndConstructors>> LapTimesByLap { get; set; }

		public LapTimesController(DbContextService dbContextService)
		{	
			_dbContextService = dbContextService;
		}

		[HttpGet]
		public async Task<IEnumerable<LapTime>> Get()
		{
			IEnumerable<LapTime> circuits = await this._dbContextService.LapTime.ToListAsync();
			return circuits;
		}

		[HttpPost]
		public Dictionary<short, IOrderedEnumerable<LapTimeWithQualifiersAndConstructors>> GetLapTimesOfRace([FromBody]Request request)
		{
			IEnumerable<Race> racesOfCircuit = this._dbContextService.Race.Where(x => x.CircuitId == request.CircuitId && x.Year == request.Year).ToList();
			//IEnumerable<Race> racesOfCircuit = races.Where(x => x.CircuitId == request.CircuitId && x.Year == request.Year).OrderBy(x => x.Date);

			IEnumerable<Int16> raceIdsOfCircuit = racesOfCircuit.Select(x => x.Id);

			IEnumerable<LapTime> lapTimes = this._dbContextService.LapTime.Where(x => raceIdsOfCircuit.Contains(x.RaceId));
			IEnumerable<Qualifying> qualifyings = this._dbContextService.Qualifying.Where(x => raceIdsOfCircuit.Contains(x.RaceId));

			this.Constructors = this._dbContextService.Constructor.ToDictionary(x => x.Id);
			this.Drivers = this._dbContextService.Driver.ToDictionary(x => x.Id);
			this.Statuses = this._dbContextService.Status.ToDictionary(x => x.Id);
			this.Results = this._dbContextService.Result.Where(x => raceIdsOfCircuit.Contains(x.RaceId)).ToList();
			this.Pitstops = this._dbContextService.PitStop.Where(x => raceIdsOfCircuit.Contains(x.RaceId)).ToList();

			this.LapTimesByLap = GetLapTimesByLap(lapTimes, qualifyings);

			return this.LapTimesByLap;
		}

		#region Helpers

		private short GetConstructorId(IEnumerable<Qualifying> qualifyings, short driverId)
		{
			short ConstructorId = 0;
			foreach(Qualifying qualifying in qualifyings)
			{
				if(qualifying.DriverId == driverId)
				{
					ConstructorId = qualifying.ConstructorId;
					break;
				}
			}

			return ConstructorId;
		}

		private Dictionary<short, IOrderedEnumerable<LapTimeWithQualifiersAndConstructors>> GetLapTimesByLap(IEnumerable<LapTime> lapTimes, IEnumerable<Qualifying> qualifyings)
		{
			List<LapTimeWithQualifiersAndConstructors> collection = new List<LapTimeWithQualifiersAndConstructors>();
			IEnumerable<Int16> constructorIds = qualifyings.Select(x => x.ConstructorId).Distinct();

			foreach(Qualifying qualifying in qualifyings.OrderBy(x=> x.Position))
			{

				LapTimeWithQualifiersAndConstructors lapTimeWithQualifiersAndConstructors = new LapTimeWithQualifiersAndConstructors();
				lapTimeWithQualifiersAndConstructors.Id = qualifying.Id;
				lapTimeWithQualifiersAndConstructors.RaceId = qualifying.RaceId;
				Driver driver = null;
				Drivers.TryGetValue(qualifying.DriverId, out driver);
				lapTimeWithQualifiersAndConstructors.DriverName = driver == null ? string.Empty : driver.FirstName + " " + driver.LastName;
				lapTimeWithQualifiersAndConstructors.DriverNumber = driver == null ? string.Empty : driver.Number.ToString();
				lapTimeWithQualifiersAndConstructors.DriverId = qualifying.DriverId;
				lapTimeWithQualifiersAndConstructors.Lap = 0;
				lapTimeWithQualifiersAndConstructors.Position = qualifying.Position;
				lapTimeWithQualifiersAndConstructors.PositionStatus = PositionStatus.NoChange;
				if (qualifying.Q1 != null)
				{
					lapTimeWithQualifiersAndConstructors.Time = qualifying.Q1;
				}
				else if(qualifying.Q2 != null)
				{
					lapTimeWithQualifiersAndConstructors.Time = qualifying.Q2;
				}
				else
				{
					lapTimeWithQualifiersAndConstructors.Time = qualifying.Q3;
				}
				lapTimeWithQualifiersAndConstructors.ConstructorId = qualifying.ConstructorId;
				Constructor constructor = null;
				Constructors.TryGetValue(lapTimeWithQualifiersAndConstructors.ConstructorId, out constructor);
				lapTimeWithQualifiersAndConstructors.ConstructorName = constructor == null ? string.Empty : constructor.Name;
				lapTimeWithQualifiersAndConstructors.HasPitstop = false;

				collection.Add(lapTimeWithQualifiersAndConstructors);
			}

			foreach(LapTime lapTime in lapTimes)
			{
				LapTimeWithQualifiersAndConstructors lapTimeWithQualifiersAndConstructors = new LapTimeWithQualifiersAndConstructors();
				lapTimeWithQualifiersAndConstructors.Id = lapTime.Id;
				lapTimeWithQualifiersAndConstructors.RaceId = lapTime.RaceId;
				lapTimeWithQualifiersAndConstructors.DriverId = lapTime.DriverId;

				Driver driver = null;
				Drivers.TryGetValue(lapTimeWithQualifiersAndConstructors.DriverId, out driver);
				lapTimeWithQualifiersAndConstructors.DriverName = driver == null ? string.Empty : driver.FirstName + " " + driver.LastName;
				lapTimeWithQualifiersAndConstructors.DriverNumber = driver == null ? string.Empty : driver.Number.ToString();

				lapTimeWithQualifiersAndConstructors.Lap = lapTime.Lap;
				lapTimeWithQualifiersAndConstructors.Position = lapTime.Position;
				lapTimeWithQualifiersAndConstructors.Time = lapTime.Time;

				lapTimeWithQualifiersAndConstructors.ConstructorId = GetConstructorId(qualifyings, lapTimeWithQualifiersAndConstructors.DriverId);
				Constructor constructor = null;
				this.Constructors.TryGetValue(lapTimeWithQualifiersAndConstructors.ConstructorId, out constructor);
				lapTimeWithQualifiersAndConstructors.ConstructorName = constructor == null ? string.Empty : constructor.Name;

				short raceStatusId = -1;
				lapTimeWithQualifiersAndConstructors.HasPitstop = CheckPitStopForLapAndDriverOfRace(lapTimeWithQualifiersAndConstructors.DriverId, lapTimeWithQualifiersAndConstructors.Lap);
				lapTimeWithQualifiersAndConstructors.RaceStatus = CheckResultForLapAndDriverOfRace(lapTimeWithQualifiersAndConstructors.DriverId, lapTimeWithQualifiersAndConstructors.Lap, out raceStatusId);
				lapTimeWithQualifiersAndConstructors.RaceStatusId = raceStatusId;

				collection.Add(lapTimeWithQualifiersAndConstructors);

			}

			//Calculate PositionStatus for each driver
			Dictionary<short, IOrderedEnumerable<LapTimeWithQualifiersAndConstructors>> lapTimesByDriver = collection.GroupBy(x => x.DriverId).ToDictionary(t => t.Key, t => t.Select(r => r).OrderBy(x => x.Lap));
			foreach (KeyValuePair<short, IOrderedEnumerable<LapTimeWithQualifiersAndConstructors>> keyValuePair in lapTimesByDriver)
			{
				var lapTimesOfDriver = keyValuePair.Value.ToArray();
				for (int i = 1; i < lapTimesOfDriver.Length - 1; i++)
				{
					if (lapTimesOfDriver[i].Position == lapTimesOfDriver[i - 1].Position)
					{
						lapTimesOfDriver[i].PositionStatus = PositionStatus.NoChange;
					}
					else if (lapTimesOfDriver[i].Position < lapTimesOfDriver[i - 1].Position)
					{
						lapTimesOfDriver[i].PositionStatus = PositionStatus.Up;
					}
					else
					{
						lapTimesOfDriver[i].PositionStatus = PositionStatus.Down;
					}
				}
			}

			Dictionary<short, IOrderedEnumerable<LapTimeWithQualifiersAndConstructors>> lapTimesByLap = collection.GroupBy(x => x.Lap).ToDictionary(t => t.Key, t => t.Select(r => r).OrderBy(x => x.Position));
			return lapTimesByLap;
		}

		private bool CheckPitStopForLapAndDriverOfRace(short driverId, short lap)
		{
			return this.Pitstops.Where(x => x.DriverId == driverId && x.Lap == lap).Any();
		}

		private string CheckResultForLapAndDriverOfRace(short driverId, short lap, out short statusId)
		{
			Result resultsOfLapAndDriver = this.Results.Where(x => x.DriverId == driverId && x.Laps == lap).FirstOrDefault();
			StringBuilder builder = new StringBuilder();
			statusId = -1;
			if(resultsOfLapAndDriver != null)
			{
				Status status = null;
				if (resultsOfLapAndDriver.StatusId.HasValue)
				{
					this.Statuses.TryGetValue(resultsOfLapAndDriver.StatusId.Value, out status);
					statusId = resultsOfLapAndDriver.StatusId.Value;
					builder.Append(status.Label.Trim());
					builder.Append(" ");
				}
			}

			return builder.ToString();
		}
		#endregion
	}
}
