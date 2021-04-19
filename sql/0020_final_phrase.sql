BEGIN;
--
-- Create model FinalPhrase
--
CREATE TABLE "acro_finalphrase" ("id" bigserial NOT NULL PRIMARY KEY, "phrase" varchar(500) NOT NULL, "game_id" bigint NOT NULL, "user_id" bigint NOT NULL);
--
-- Create constraint final_phrase_one_per_game_user on model finalphrase
--
ALTER TABLE "acro_finalphrase" ADD CONSTRAINT "final_phrase_one_per_game_user" UNIQUE ("game_id", "user_id");
ALTER TABLE "acro_finalphrase" ADD CONSTRAINT "acro_finalphrase_game_id_9f390a45_fk_acro_finishedgame_id" FOREIGN KEY ("game_id") REFERENCES "acro_finishedgame" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "acro_finalphrase" ADD CONSTRAINT "acro_finalphrase_user_id_07bb8f7c_fk_acro_user_id" FOREIGN KEY ("user_id") REFERENCES "acro_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "acro_finalphrase_game_id_9f390a45" ON "acro_finalphrase" ("game_id");
CREATE INDEX "acro_finalphrase_user_id_07bb8f7c" ON "acro_finalphrase" ("user_id");
COMMIT;
