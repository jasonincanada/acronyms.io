BEGIN;
--
-- Create constraint slug_unique on model room
--
ALTER TABLE "acro_room" ADD CONSTRAINT "slug_unique" UNIQUE ("slug");
COMMIT;
