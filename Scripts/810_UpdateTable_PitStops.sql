/*
   Παρασκευή, 22 Φεβρουαρίου 20194:17:01 μμ
   User: 
   Server: DEVEL-20\SQLEXPRESS
   Database: F1Statistics
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
ALTER TABLE dbo.PitStops
	DROP CONSTRAINT PK_PitStops
GO
ALTER TABLE dbo.PitStops SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.PitStops', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.PitStops', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.PitStops', 'Object', 'CONTROL') as Contr_Per 