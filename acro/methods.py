from django.db import transaction
from .models   import ActiveGame, FinishedGame, LatestPhrase, FinalPhrase


# close a game by moving it from ActiveGame to FinishedGame and moving all
# phrases for it into FinalPhrase. this is meant to be called internally by
# triggers (django_background_tasks) and not from a user-accessible API
#
def close_game(game_id):

  game = ActiveGame.objects.get(pk=game_id)

  with transaction.atomic():

    finished = FinishedGame.objects.create(room    = game.room,
                                           acronym = game.acronym,
                                           started = game.started)

    # move the phrases into FinalPhrases
    phrases = LatestPhrase.objects           \
                          .filter(game=game) \

    for latest in phrases:
      FinalPhrase.objects.create(game   = finished,
                                 user   = latest.user,
                                 phrase = latest.phrase)
      latest.delete()


    # the active game no longer exists
    game.delete()

