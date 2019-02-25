USE [F1Statistics]
GO

/****** Object:  Table [dbo].[Race]    Script Date: 25/2/2019 12:07:50 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Race](
	[Id] [smallint] NOT NULL,
	[Year] [smallint] NOT NULL,
	[Round] [smallint] NOT NULL,
	[CircuitId] [smallint] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Date] [date] NOT NULL,
	[Time] [time](7) NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK_Races] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


