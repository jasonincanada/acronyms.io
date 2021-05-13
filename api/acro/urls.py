from django.urls import path

from . import api
from . import views

urlpatterns = [
  path('',          views.HomeView.as_view(), name='home'),
  path('r/<slug>/', views.RoomView.as_view(), name='room'),
  path('signup/',   views.SignUpView.as_view(), name='signup'),

  path('room/<slug>/get',                 api.get_room, name='api-get-room'),
  path('room/<int:room_id>/new-game/',    api.new_game, name='api-new-game'),
  path('activegame/<int:game_id>/phrase/post', api.post_phrase, name='api-post-phrase'),
  path('votes/<int:game_id>/get',         api.get_votes, name='api-get-votes'),
  path('phrase/<int:phrase_id>/vote/',    api.vote, name='api-vote'),
  path('activegame/<slug>/get',           api.get_activegame, name='api-get-activegame'),
  path('finishedgames/<slug>/get',        api.get_finished_games, name='api-get-finishedgames'),
  path('finalphrases/<int:game_id>/get',  api.get_final_phrases, name='api-get-finalphrases'),
  path('csrf/get',                        api.get_csrf, name='api-get-csrf'),
  path('login',                           api.login_user, name='api-login-user'),
]

