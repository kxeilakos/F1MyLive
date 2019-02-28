using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class Season
	{
		[Key]
		public Int16 Year { get; set; }

		public string Url { get; set; }
	}
}
