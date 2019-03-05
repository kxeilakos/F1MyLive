using Formula1MyLive.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Configuration
{
	public class DatabaseConfiguration: IValidatableConfiguration
	{
		public string ConnectionString { get; set; }

		public void Validate()
		{
			if (string.IsNullOrEmpty(this.ConnectionString)) throw new Exception($"{nameof(DatabaseConfiguration)}.{nameof(DatabaseConfiguration.ConnectionString)} is missing from configuration.");
		}
	}
}
