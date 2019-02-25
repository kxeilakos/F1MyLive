USE [F1Statistics]
GO

/****** Object:  Table [dbo].[Qualifying]    Script Date: 25/2/2019 12:07:26 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Qualifying](
	[Id] [smallint] NOT NULL,
	[RaceId] [smallint] NOT NULL,
	[DriverId] [smallint] NOT NULL,
	[ConstructorId] [smallint] NOT NULL,
	[Number] [smallint] NOT NULL,
	[Position] [smallint] NOT NULL,
	[Q1] [nvarchar](max) NULL,
	[Q2] [nvarchar](max) NULL,
	[Q3] [nvarchar](max) NULL,
 CONSTRAINT [PK_Qualifying] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


