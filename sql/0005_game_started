BEGIN;
--
-- Add field started to game
--
ALTER TABLE "acro_game" ADD COLUMN "started" timestamp with time zone DEFAULT '2021-04-18T02:21:55.546743+00:00'::timestamptz NOT NULL;
ALTER TABLE "acro_game" ALTER COLUMN "started" DROP DEFAULT;
COMMIT;
