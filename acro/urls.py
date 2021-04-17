from django.urls import path

from . import views

urlpatterns = [
  path('', views.index, name='index'),
  path('r/<slug>/', views.RoomView.as_view(), name='room')
]

