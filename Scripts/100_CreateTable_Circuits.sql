/*
   Παρασκευή, 22 Φεβρουαρίου 201912:44:24 μμ
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
CREATE TABLE dbo.Circuits
	(
	CircuitId smallint NOT NULL,
	CircuitRef nvarchar(255) NULL,
	Name nvarchar(255) NULL,
	Location nvarchar(255) NULL,
	Country nvarchar(255) NULL,
	lat float(53) NULL,
	lng float(53) NULL,
	alt smallint NULL,
	url nvarchar(MAX) NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Circuits ADD CONSTRAINT
	PK_Circuits PRIMARY KEY CLUSTERED 
	(
	CircuitId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Circuits SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Circuits', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Circuits', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Circuits', 'Object', 'CONTROL') as Contr_Per 