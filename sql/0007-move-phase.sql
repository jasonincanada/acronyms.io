BEGIN;
--
-- Remove field phase from game
--
ALTER TABLE "acro_game" DROP COLUMN "phase" CASCADE;
--
-- Add field phase to activegame
--
ALTER TABLE "acro_activegame" ADD COLUMN "phase" varchar(1) DEFAULT 'G' NOT NULL;
ALTER TABLE "acro_activegame" ALTER COLUMN "phase" DROP DEFAULT;
--
-- Add field finished to game
--
ALTER TABLE "acro_game" ADD COLUMN "finished" timestamp with time zone NULL;
COMMIT;
