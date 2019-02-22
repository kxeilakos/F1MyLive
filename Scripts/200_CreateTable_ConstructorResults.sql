/*
   Παρασκευή, 22 Φεβρουαρίου 201912:54:07 μμ
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
CREATE TABLE dbo.ConstructorResults
	(
	ConstructorResultsId smallint NOT NULL,
	RaceId smallint NOT NULL,
	ConstructorId smallint NOT NULL,
	Points int NOT NULL,
	Status nvarchar(255) NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.ConstructorResults ADD CONSTRAINT
	DF_ConstructorResults_Points DEFAULT (0) FOR Points
GO
ALTER TABLE dbo.ConstructorResults ADD CONSTRAINT
	PK_ConstructorResults PRIMARY KEY CLUSTERED 
	(
	ConstructorResultsId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.ConstructorResults SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.ConstructorResults', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.ConstructorResults', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.ConstructorResults', 'Object', 'CONTROL') as Contr_Per 