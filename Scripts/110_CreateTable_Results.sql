USE [F1Statistics]
GO

/****** Object:  Table [dbo].[Result]    Script Date: 25/2/2019 12:08:01 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Result](
	[Id] [int] NOT NULL,
	[RaceId] [smallint] NOT NULL,
	[DriverId] [smallint] NOT NULL,
	[ConstructorId] [smallint] NOT NULL,
	[Number] [smallint] NULL,
	[Grid] [smallint] NOT NULL,
	[Position] [smallint] NULL,
	[PositionText] [nvarchar](max) NOT NULL,
	[PositionOrder] [smallint] NOT NULL,
	[Points] [int] NOT NULL,
	[Laps] [smallint] NOT NULL,
	[Time] [nvarchar](max) NULL,
	[Milliseconds] [int] NULL,
	[FastestLap] [smallint] NULL,
	[Rank] [smallint] NULL,
	[FastestLapTime] [nvarchar](max) NULL,
	[FastestLapSpeed] [nvarchar](max) NULL,
	[StatusId] [smallint] NOT NULL,
 CONSTRAINT [PK_Results] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[Result] ADD  CONSTRAINT [DF_Results_Rank]  DEFAULT ((0)) FOR [Rank]
GO


