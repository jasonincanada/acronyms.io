BEGIN;
--
-- Remove field phase from activegame
--
ALTER TABLE "acro_activegame" DROP COLUMN "phase" CASCADE;
COMMIT;
