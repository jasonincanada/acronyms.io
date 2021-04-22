from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect, render
from django.views     import generic

from .models import LatestPhrase, Room
from .forms  import SignUpForm


class HomeView(generic.TemplateView):
  template_name = 'acro/home.html'


class RoomView(LoginRequiredMixin, generic.DetailView):
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

      return redirect('home')

    else:
      return render(request, 'acro/signup.html', { 'form': form })


  def get(self, request):
    form = SignUpForm()

    return render(request, 'acro/signup.html', { 'form': form })

