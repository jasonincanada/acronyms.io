from django.urls import path

from . import api

urlpatterns = [

  # game api
  path('room/<slug>/get',                 api.get_room, name='api-get-room'),
  path('activegame/<slug>/get',           api.get_activegame, name='api-get-activegame'),
  path('activegame/<slug>/start',         api.start_game, name='api-start-game'),
  path('activegame/<int:game_id>/phrase/post', api.post_phrase, name='api-post-phrase'),
  path('finishedgames/<slug>/get',        api.get_finished_games, name='api-get-finishedgames'),
  path('finalphrases/<int:game_id>/get',  api.get_final_phrases, name='api-get-finalphrases'),
  path('phrase/<int:phrase_id>/vote/',    api.vote, name='api-vote'),
  path('votes/<int:game_id>/get',         api.get_votes, name='api-get-votes'),

  # user auth
  path('csrf/get',                        api.get_csrf, name='api-get-csrf'),
  path('login',                           api.login_user, name='api-login-user'),
  path('signup',                          api.signup_user, name='api-signup-user'),
]

