from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from .models import ActiveGame, Game, Room

import random
import string


@login_required
def new_game(request, room_id):

  # see if we have a game already going on
  count = ActiveGame.objects.filter(room_id=room_id).count()

  if count > 0:
    return JsonResponse({ 'error': 'Game already in progress' })

  # TODO: race condition here, creating game some time after checking if we can


  # TODO: check access permission


  acronym = generate_acronym();

  game = Game.objects.create(room_id=room_id,
                             acronym=acronym,
                             phase=Game.GATHER)

  active_game = ActiveGame.objects.create(room_id=room_id,
                                          game_id=game.id)

  data = {
    'room_id': room_id,
    'game_id': game.id,
    'acronym': acronym
  }

  return JsonResponse(data)


def generate_acronym():
  length   = random.randint(4, 8)
  alphabet = string.ascii_lowercase

  return ( ''.join(random.choice(alphabet) for i in range(length)) )

