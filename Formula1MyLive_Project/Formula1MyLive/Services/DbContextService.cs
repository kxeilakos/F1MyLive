using Formula1MyLive.Interfaces;
using Formula1MyLive.Database.Model;
using Microsoft.EntityFrameworkCore;

namespace Formula1MyLive.Services
{
	public class DbContextService : DbContext
	{
		public DbContextService(DbContextOptions<DbContextService> options) : base(options) { }

		public DbSet<Circuit> Circuit { get; set; }
		public DbSet<Constructor> Constructor { get; set; }
		public DbSet<ConstructorResult> ConstructorResult { get; set; }
		public DbSet<ConstructorStanding> ConstructorStanding { get; set; }
		public DbSet<Driver> Driver { get; set; }
		public DbSet<DriverStanding> DriverStanding { get; set; }
		public DbSet<LapTime> LapTime { get; set; }
		public DbSet<PitStop> PitStop { get; set; }
		public DbSet<Qualifying> Qualifying { get; set; }
		public DbSet<Race> Race { get; set; }
		public DbSet<Race> Result { get; set; }
		public DbSet<Race> Season { get; set; }
		public DbSet<Race> Status { get; set; }
	}
}
