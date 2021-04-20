from django.contrib.auth.decorators import login_required
from django.db   import IntegrityError, transaction
from django.http import JsonResponse

from .models import Acronym, ActiveGame, Room

import random
import string


@login_required
def new_game(request, room_id):

  try:
    with transaction.atomic():
      acronym = generate_acronym();

      active_game = ActiveGame.objects.create(room_id=room_id,
                                              acronym=acronym,
                                              phase=ActiveGame.GATHER)

      response = {
        'game_id': game.id,
        'acronym': acronym.acronym
      }

  except IntegrityError:
    response = {
      'error': 'Game already in progress',
    }

  return JsonResponse(response)


# generate and return a new Acronym object if it's a newly-seen acronym
# or return the record of the existing one
def generate_acronym():
  length   = random.randint(4, 8)
  alphabet = string.ascii_lowercase

  acronym = ( ''.join(random.choice(alphabet) for i in range(length)) )

  obj, created = Acronym.objects.get_or_create(acronym=acronym)

  return obj


@login_required
def get_room(request, room_id):

  room = Room.objects.get(pk=room_id)

  response = { 'id': room.id }

  # add details of the active game if any
  if room.activegame:
    response.update({ 'acronym': room.activegame.acronym.acronym})

  return JsonResponse(response)

