BEGIN;
--
-- Add field finishing to activegame
--
ALTER TABLE "acro_activegame" ADD COLUMN "finishing" timestamp with time zone DEFAULT '2021-05-08T01:18:52.240993+00:00'::timestamptz NOT NULL;
ALTER TABLE "acro_activegame" ALTER COLUMN "finishing" DROP DEFAULT;
COMMIT;
