/*
   Παρασκευή, 22 Φεβρουαρίου 20191:03:25 μμ
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
CREATE TABLE dbo.ConstructorStandings
	(
	ConstructorStandingsId smallint NOT NULL,
	RaceId smallint NULL,
	ConstructorId smallint NULL,
	Points int NULL,
	Position smallint NULL,
	PositionText nvarchar(255) NULL,
	Wins smallint NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.ConstructorStandings SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.ConstructorStandings', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.ConstructorStandings', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.ConstructorStandings', 'Object', 'CONTROL') as Contr_Per 