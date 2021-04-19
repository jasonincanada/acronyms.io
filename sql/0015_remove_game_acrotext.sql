BEGIN;
--
-- Remove field acrotext from game
--
ALTER TABLE "acro_game" DROP COLUMN "acrotext" CASCADE;
COMMIT;
