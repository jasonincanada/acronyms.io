from django.http      import HttpResponse
from django.shortcuts import render
from django.views     import generic

from .models import Room


def index(request):
  return HttpResponse("acro game main page")


class RoomView(generic.DetailView):
  model = Room
  template_name = 'acro/room.html'
  context_object_name = 'room'
  slug_field = 'slug'

