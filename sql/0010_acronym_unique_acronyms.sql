BEGIN;
--
-- Create constraint unique_acronyms on model acronym
--
ALTER TABLE "acro_acronym" ADD CONSTRAINT "unique_acronyms" UNIQUE ("acronym");
COMMIT;
