USE [F1Statistics]
GO

/****** Object:  Table [dbo].[Circuit]    Script Date: 25/2/2019 12:04:48 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Circuit](
	[Id] [smallint] NOT NULL,
	[CircuitRef] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Location] [nvarchar](max) NULL,
	[Country] [nvarchar](max) NULL,
	[lat] [float] NULL,
	[lng] [float] NULL,
	[alt] [smallint] NULL,
	[url] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Circuits] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


