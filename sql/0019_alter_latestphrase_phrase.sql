BEGIN;
--
-- Alter field phrase on latestphrase
--
ALTER TABLE "acro_latestphrase" ALTER COLUMN "phrase" TYPE varchar(500);
COMMIT;
