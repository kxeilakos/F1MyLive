/*
   Παρασκευή, 22 Φεβρουαρίου 20191:45:13 μμ
   User: 
   Server: DEVEL-20\SQLEXPRESS
   Database: F1SampleDb
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.Results
	(
	ResultId smallint NOT NULL,
	RaceId smallint NOT NULL,
	DriverId smallint NOT NULL,
	ConstructorId smallint NOT NULL,
	Number smallint NOT NULL,
	Grid smallint NOT NULL,
	Position smallint NULL,
	PositionText nvarchar(MAX) NOT NULL,
	PositionOrder smallint NOT NULL,
	Points int NOT NULL,
	Laps smallint NOT NULL,
	Time nvarchar(MAX) NULL,
	Milliseconds smallint NULL,
	FastestLap smallint NULL,
	Rank smallint NOT NULL,
	FastestLapTime nvarchar(MAX) NULL,
	fastestLapSpeed nvarchar(MAX) NULL,
	StatusId smallint NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Results ADD CONSTRAINT
	DF_Results_Rank DEFAULT (0) FOR Rank
GO
ALTER TABLE dbo.Results ADD CONSTRAINT
	PK_Results PRIMARY KEY CLUSTERED 
	(
	ResultId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Results SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Results', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Results', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Results', 'Object', 'CONTROL') as Contr_Per 