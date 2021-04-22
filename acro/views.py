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

  def get_context_data(self, **kwargs):
    context = super(RoomView, self).get_context_data(**kwargs)

    # return the latest phrase for this user if any
    context['my'] = { 'phrase': '' }

    room = self.get_object()

    if hasattr(room, 'activegame'):
      phrase = LatestPhrase.objects.filter(game=room.activegame,
                                           user=self.request.user).all()
      if phrase.count() > 0:
        context['my'] = { 'phrase': phrase[0].phrase }

    return context


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

