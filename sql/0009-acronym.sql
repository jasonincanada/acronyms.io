BEGIN;
--
-- Create model Acronym
--
CREATE TABLE "acro_acronym" ("id" bigserial NOT NULL PRIMARY KEY, "acronym" varchar(50) NOT NULL, "added" timestamp with time zone NOT NULL);
COMMIT;
