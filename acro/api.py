from django.contrib.auth.decorators import login_required
from django.db   import IntegrityError, transaction
from django.http import JsonResponse

from .models import ActiveGame, Game, Room

import random
import string


@login_required
def new_game(request, room_id):

  # TODO: check access permission

  acronym = generate_acronym();

  try:
    with transaction.atomic():
      game = Game.objects.create(room_id=room_id,
                                 acronym=acronym)

      active_game = ActiveGame.objects.create(room_id=room_id,
                                              game=game,
                                              phase=ActiveGame.GATHER)

      response = {
        'game_id': game.id,
        'acronym': acronym
      }

  except IntegrityError:
    response = {
      'error': 'Game already in progress',
    }

  return JsonResponse(response)


def generate_acronym():
  length   = random.randint(4, 8)
  alphabet = string.ascii_lowercase

  return ( ''.join(random.choice(alphabet) for i in range(length)) )

