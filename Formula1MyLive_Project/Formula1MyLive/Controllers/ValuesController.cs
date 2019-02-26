using Formula1MyLive.Database.Model;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Formula1MyLive.Controllers
{
	[Route("api/values")]
	public class ValuesController : Controller
	{
		private readonly DbContextService  _dbContextService;
		public ValuesController(DbContextService dbContextService)
		{
			_dbContextService = dbContextService;
		}

		// GET api/values
		[HttpGet]
		public async Task<IEnumerable<Circuit>> Get()
		{
			IEnumerable<Circuit> circuits =await  this._dbContextService.Circuit.ToListAsync();
			return circuits;	
		}

		// GET api/values/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody]string value)
		{
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
