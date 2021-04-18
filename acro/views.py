from django.contrib.auth import authenticate, login
from django.http      import HttpResponse
from django.shortcuts import redirect, render
from django.views     import generic

from .models import Room
from .forms  import SignUpForm


def index(request):
  return HttpResponse("acro game main page")


class RoomView(generic.DetailView):
  model = Room
  template_name = 'acro/room.html'
  context_object_name = 'room'
  slug_field = 'slug'


class SignUpView(generic.View):

  def post(self, request):
    form = SignUpForm(request.POST)

    if form.is_valid():
      form.save()

      username = form.cleaned_data.get('username')
      password = form.cleaned_data.get('password1')
      user = authenticate(username=username, password=password)
      login(request, user)

      return redirect('index')

    else:
      return render(request, 'acro/signup.html', { 'form': form })


  def get(self, request):
    form = SignUpForm()

    return render(request, 'acro/signup.html', { 'form': form })

