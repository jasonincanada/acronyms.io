BEGIN;
--
-- Create model Vote
--
CREATE TABLE "acro_vote" ("id" bigserial NOT NULL PRIMARY KEY, "voted_on" timestamp with time zone NOT NULL, "game_id" bigint NOT NULL, "phrase_id" bigint NOT NULL, "voter_id" bigint NOT NULL);
--
-- Create constraint vote_one_per_game_voter on model vote
--
ALTER TABLE "acro_vote" ADD CONSTRAINT "vote_one_per_game_voter" UNIQUE ("game_id", "voter_id");
ALTER TABLE "acro_vote" ADD CONSTRAINT "acro_vote_game_id_e45e63ff_fk_acro_finishedgame_id" FOREIGN KEY ("game_id") REFERENCES "acro_finishedgame" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "acro_vote" ADD CONSTRAINT "acro_vote_phrase_id_a418a616_fk_acro_finalphrase_id" FOREIGN KEY ("phrase_id") REFERENCES "acro_finalphrase" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "acro_vote" ADD CONSTRAINT "acro_vote_voter_id_ce9d0661_fk_acro_user_id" FOREIGN KEY ("voter_id") REFERENCES "acro_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "acro_vote_game_id_e45e63ff" ON "acro_vote" ("game_id");
CREATE INDEX "acro_vote_phrase_id_a418a616" ON "acro_vote" ("phrase_id");
CREATE INDEX "acro_vote_voter_id_ce9d0661" ON "acro_vote" ("voter_id");
COMMIT;
