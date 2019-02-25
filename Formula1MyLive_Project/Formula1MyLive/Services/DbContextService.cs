using Formula1MyLive.Interfaces;
using Formula1MyLive.Database.Model;
using Microsoft.EntityFrameworkCore;

namespace Formula1MyLive.Services
{
	public class DbContextService : DbContext
	{
		public DbContextService(DbContextOptions<DbContextService> options) : base(options) { }

		public DbSet<Campaign> Campaign { get; set; }
		public DbSet<CampaignContactGroup> CampaignContactGroup { get; set; }
	}
}
