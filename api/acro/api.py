from django.contrib.auth            import authenticate, login
from django.contrib.auth.decorators import login_required
from django.db.models               import Count
from django.middleware.csrf         import get_token
from django.db    import IntegrityError, transaction
from django.http  import JsonResponse
from django.utils import timezone

from .forms  import SignUpForm
from .models import ActiveGame, FinishedGame,  \
                    LatestPhrase, FinalPhrase, \
                    Acronym, Room, User, Vote
from .methods import finish_game

import datetime
import random
import string


# convert outgoing timestamps to this format
timestamp_format = "%Y-%m-%d %H:%M:%S"


#- User Auth -#

def get_csrf(request):
  token = get_token(request)
  return JsonResponse({'token': token})


def login_user(request):
  if request.POST:
    username = request.POST['username']
    password = request.POST['password']

    user = authenticate(username=username, password=password)

    if user is not None:
      if user.is_active:
        login(request, user)

        # get our custom user that knows about the display name
        user2 = User.objects.get(username=username)

        return JsonResponse({'result': 'ok',
                             'displayname': user2.display_name })

    return JsonResponse({'result': 'error',
                         'errorMessage': 'Invalid login' })


# https://simpleisbetterthancomplex.com/tutorial/2017/02/18/how-to-create-user-sign-up-view.html
#
def signup_user(request):
  if request.method == 'POST':
    form = SignUpForm(request.POST)

    if form.is_valid():
      form.save()
      username = form.cleaned_data.get('username')
      raw_password = form.cleaned_data.get('password1')
      user = authenticate(username=username, password=raw_password)
      login(request, user)

      return JsonResponse({'result': 'ok'})

    else:
      return JsonResponse({'result': 'error',
                           'errors': form.errors})


#- Game API -#

@login_required
def start_game(request, slug):

  try:
    room = Room.objects.get(slug=slug)

    with transaction.atomic():
      acronym = generate_acronym();
      finishing = datetime.datetime.now() + datetime.timedelta(minutes=1)

      activegame = ActiveGame.objects.create(room=room,
                                             acronym=acronym,
                                             finishing=finishing)

      response = {
        'result': 'ok',
        'activegame': {
          'id': activegame.id,
          'acronym': activegame.acronym.acronym,
          'started': activegame.started.strftime(timestamp_format),
          'finishing': activegame.finishing.strftime(timestamp_format),
        },
        'myphrase': None,
      }

    # finish the game later in a background task
    finish_game(activegame.id)


  except Room.DoesNotExist:
    response = { 'result': 'error',
                 'error':  'There\'s no such room' }

  except IntegrityError:
    response = { 'result': 'error',
                 'error':  'Game already in progress' }

  return JsonResponse(response)


def get_activegame(request, slug):

  try:
    activegame = ActiveGame.objects.get(room__slug=slug)

    response = {
      'result': 'ok',
      'activegame': {
        'id': activegame.id,
        'acronym': activegame.acronym.acronym,
        'started': activegame.started.strftime(timestamp_format),
        'finishing': activegame.finishing.strftime(timestamp_format),
      },
      'myphrase': None,
    }

    # see if we have a phrase for this user yet
    latest = LatestPhrase.objects                   \
                         .filter(game=activegame)   \
                         .filter(user=request.user) \
                         .first()

    if latest:
      response.update({'myphrase': latest.phrase})

    return JsonResponse(response)

  except ActiveGame.DoesNotExist:
    return JsonResponse({'result': 'error',
                         'error': 'no game'})


# generate and return a new Acronym object if it's a newly-seen acronym
# or return the record of the existing one
def generate_acronym():
  length   = random.randint(4, 8)
  alphabet = string.ascii_lowercase
  acronym  = (''.join(random.choice(alphabet) for i in range(length)))

  obj, created = Acronym.objects.get_or_create(acronym=acronym)

  return obj


# return the IDs, acronyms, and finishing times for the latest 10 finished games for a room
def get_finished_games(request, slug):

  games = FinishedGame.objects                   \
                      .select_related('acronym') \
                      .filter(room__slug=slug)   \
                      .order_by('-finished')     \
                      [:10]

  data = [ { 'id':       game.id,
             'finished': game.finished.strftime(timestamp_format),
             'acronym':  game.acronym.acronym }

             for game in games ]

  response = {'result': 'ok',
              'finishedgames': data}

  return JsonResponse(response)


# return the phrases and current vote tally for a finished game
def get_final_phrases(request, game_id):

  sql = """
    WITH vote_counts AS
    (
      SELECT    phrase.id AS phrase_id,
                phrase.user_id AS author_id,
                COUNT(voter.id) AS votes

      FROM      acro_finalphrase phrase
      LEFT JOIN acro_vote        voter  ON voter.phrase_id = phrase.id

      WHERE     phrase.game_id = %s
      GROUP BY  phrase.id,
                phrase.user_id
    ),

    my_votes AS
    (
      SELECT    phrase_id
      FROM      acro_vote
      WHERE     game_id = %s AND voter_id = %s
    )

    SELECT    vote_counts.phrase_id AS id,
              vote_counts.votes,
              phrase.phrase,
              author.display_name,
              my_votes.phrase_id AS playervoted

    FROM      vote_counts
         JOIN acro_finalphrase phrase ON phrase.id = vote_counts.phrase_id
         JOIN acro_user        author ON author.id = vote_counts.author_id
    LEFT JOIN my_votes
           ON my_votes.phrase_id = vote_counts.phrase_id
  """

  phrases = FinalPhrase.objects.raw(sql, [game_id, game_id, request.user.id])

  data = [ { 'id':     p.id,
             'phrase': p.phrase,
             'author': p.display_name,
             'votes':  p.votes,
             'playervoted': True if p.playervoted is not None else False }

             for p in phrases ]

  response = {'result': 'ok',
              'phrases': data}

  return JsonResponse(response)


@login_required
def get_room(request, slug):

  try:
    room = Room.objects.get(slug=slug)

    response = {'result': 'ok',
                'slug': room.slug,
                'description': room.description}

    return JsonResponse(response)

  except Room.DoesNotExist:
    return JsonResponse({'result': 'no room'})


@login_required
def post_phrase(request, game_id):

  try:
    game   = ActiveGame.objects.get(pk=game_id)
    acro   = game.acronym.acronym
    phrase = request.POST['phrase']
    result = valid_phrase_for(acro, phrase)

    if result == 'ok':
      latest, created = LatestPhrase \
                          .objects   \
                          .update_or_create(game=game,
                                            user=request.user,
                                            defaults={'phrase': phrase,
                                                      'sent': timezone.now()})

      return JsonResponse({'result': 'ok'})

    else:
      return JsonResponse({'result': 'error',
                           'error': result})

  # ActiveGame.DoesNotExist will be thrown if the initial game fetch fails
  # ValueError will be thrown if the initial fetch succeeds but the game ends
  # before the create() call runs
  except (ActiveGame.DoesNotExist, ValueError):
    return JsonResponse({'result': 'no game'})


def valid_phrase_for(acro, phrase):

  words = phrase.split()

  if len(words) == 0       : return 'no words'
  if len(words) < len(acro): return 'not enough words'
  if len(words) > len(acro): return 'too many words'

  for i, letter in enumerate(acro):
    if letter.lower() != words[i][0].lower():
      return 'invalid for ' + letter

  return 'ok'


@login_required
def vote(request, phrase_id):

  phrase = FinalPhrase.objects                \
                      .select_related('game') \
                      .get(pk=phrase_id)

  Vote.objects \
      .update_or_create(voter    = request.user,
                        game     = phrase.game,
                        defaults = {'phrase': phrase,
                                    'voted_on': timezone.now()} )

  # return a new vote count for this game
  tally = FinalPhrase.objects                       \
                     .filter(game=phrase.game)      \
                     .annotate(votes=Count('vote'))

  data = [ { 'phrase_id': phrase.id,
             'votes'    : phrase.votes }

             for phrase in tally ]

  response = {'result': 'ok',
              'tally': data}

  return JsonResponse(response)


# return a vote tally for each phrase in a finished game, and include for each phrase
# whether the player voted for it. if a player could vote for only one phrase per game,
# we could render their vote at the FinishedGame level instead of per phrase. but we
# might allow voting on more than one phrase at some point, so this query is already set
# up it
#
def get_votes(request, game_id):

  sql = """
    WITH vote_counts AS
    (
      SELECT    phrase.id AS phrase_id,
                COUNT(voter.id) AS votes

      FROM      acro_finalphrase phrase
      LEFT JOIN acro_vote        voter
             ON voter.phrase_id = phrase.id

      WHERE     phrase.game_id = %s
      GROUP BY  phrase.id
    ),

    my_votes AS
    (
      SELECT    phrase_id
      FROM      acro_vote
      WHERE     game_id = %s AND voter_id = %s
    )

    SELECT    vote_counts.phrase_id AS id,
              vote_counts.votes,
              my_votes.phrase_id AS playervoted

    FROM      vote_counts
    LEFT JOIN my_votes
           ON my_votes.phrase_id = vote_counts.phrase_id
  """

  phrases = FinalPhrase.objects.raw(sql, [game_id, game_id, request.user.id])

  data = [ { 'phrase_id':   p.id,
             'playervoted': True if p.playervoted is not None else False,
             'votes':       p.votes }

             for p in phrases ]

  response = {'result': 'ok',
              'phrases': data}

  return JsonResponse(response)

