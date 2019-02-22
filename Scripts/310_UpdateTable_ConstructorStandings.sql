/*
   Παρασκευή, 22 Φεβρουαρίου 20192:07:35 μμ
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
CREATE TABLE dbo.Tmp_ConstructorStandings
	(
	ConstructorStandingsId smallint NOT NULL,
	RaceId smallint NOT NULL,
	ConstructorId smallint NOT NULL,
	Points int NOT NULL,
	Position smallint NULL,
	PositionText nvarchar(MAX) NULL,
	Wins smallint NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_ConstructorStandings SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_ConstructorStandings ADD CONSTRAINT
	DF_ConstructorStandings_Wins DEFAULT (0) FOR Wins
GO
IF EXISTS(SELECT * FROM dbo.ConstructorStandings)
	 EXEC('INSERT INTO dbo.Tmp_ConstructorStandings (ConstructorStandingsId, RaceId, ConstructorId, Points, Position, PositionText, Wins)
		SELECT ConstructorStandingsId, RaceId, ConstructorId, Points, Position, CONVERT(nvarchar(MAX), PositionText), Wins FROM dbo.ConstructorStandings WITH (HOLDLOCK TABLOCKX)')
GO
DROP TABLE dbo.ConstructorStandings
GO
EXECUTE sp_rename N'dbo.Tmp_ConstructorStandings', N'ConstructorStandings', 'OBJECT' 
GO
COMMIT
select Has_Perms_By_Name(N'dbo.ConstructorStandings', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.ConstructorStandings', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.ConstructorStandings', 'Object', 'CONTROL') as Contr_Per 