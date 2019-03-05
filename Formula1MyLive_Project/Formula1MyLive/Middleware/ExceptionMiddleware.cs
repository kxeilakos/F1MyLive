using Formula1MyLive.Interfaces;
using Formula1MyLive.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Formula1MyLive.Middleware
{
	public class ExceptionMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly ILoggerManager _logger;

		public ExceptionMiddleware(RequestDelegate next, ILoggerManager logger)
		{
			_logger = logger;
			_next = next;
		}

		public async Task InvokeAsync(HttpContext httpContext)
		{
			try
			{
				await _next(httpContext);
			}
			catch(Exception ex)
			{
				_logger.LogError($"Something went wrong: {ex.Message}");
				await HandleExceptionAsync(httpContext, ex);
			}
		}

		private static Task HandleExceptionAsync(HttpContext httpContext, Exception ex)
		{
			httpContext.Response.ContentType = "application/json";
			httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

			return httpContext.Response.WriteAsync(new ErrorDetails()
			{
				StatusCode = httpContext.Response.StatusCode,
				Message = "Internal Server Error." + ex.Message
			}.ToString());

		}
	}
}
