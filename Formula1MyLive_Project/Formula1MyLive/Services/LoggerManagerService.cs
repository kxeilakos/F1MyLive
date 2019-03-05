using Formula1MyLive.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NLog;

namespace Formula1MyLive.Services
{
	public class LoggerManagerService: ILoggerManager
	{
		private static ILogger logger = LogManager.GetCurrentClassLogger();

		public LoggerManagerService() { }

		public void LogDebug(string message)
		{
			logger.Debug(message);
		}
		public void LogError(string message)
		{
			logger.Error(message);
		}

		public void LogInfo(string message)
		{
			logger.Info(message);
		}

		public void LogWarn(string message)
		{
			logger.Warn(message);
		}
	}
}
