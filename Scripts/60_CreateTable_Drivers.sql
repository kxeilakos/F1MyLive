USE [F1Statistics]
GO

/****** Object:  Table [dbo].[Driver]    Script Date: 25/2/2019 12:06:24 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Driver](
	[Id] [smallint] NOT NULL,
	[DriverRef] [nvarchar](max) NOT NULL,
	[Number] [smallint] NULL,
	[Code] [nvarchar](50) NULL,
	[FirstName] [nvarchar](max) NOT NULL,
	[LastName] [nvarchar](max) NOT NULL,
	[DateOfBirth] [date] NULL,
	[Nationality] [nvarchar](max) NULL,
	[Url] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Drivers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


