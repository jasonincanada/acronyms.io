from django.urls import path

from . import api
from . import views

urlpatterns = [
  path('',          views.HomeView.as_view(), name='home'),
  path('r/<slug>/', views.RoomView.as_view(), name='room'),
  path('signup/',   views.SignUpView.as_view(), name='signup'),

  path('room/<int:room_id>/get',          api.get_room, name='api-get-room'),
  path('room/<int:room_id>/new-game/',    api.new_game, name='api-new-game'),
  path('game/<int:game_id>/post-phrase/', api.post_phrase, name='api-post-phrase'),
  path('game/<int:game_id>/vote/',        api.vote, name='api-vote'),
  path('csrf/get',                        api.get_csrf, name='api-get-csrf'),
  path('login',                           api.login_user, name='api-login-user'),
]

