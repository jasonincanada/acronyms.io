from django.urls import path

from . import views

urlpatterns = [
  path('',          views.HomeView.as_view(), name='home'),
  path('r/<slug>/', views.RoomView.as_view(), name='room'),
  path('signup/',   views.SignUpView.as_view(), name='signup')
]

