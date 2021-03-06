from django import forms
from django.contrib.auth        import get_user_model
from django.contrib.auth.forms  import UserCreationForm
from django.contrib.auth.models import User

# https://stackoverflow.com/questions/17873855/manager-isnt-available-user-has-been-swapped-for-pet-person/17874111#17874111
User = get_user_model()


class SignUpForm(UserCreationForm):
  first_name = forms.CharField(max_length=30, required=False, help_text='Optional')
  last_name  = forms.CharField(max_length=30, required=False, help_text='Optional')
  email      = forms.EmailField(max_length=254, help_text='Please provide a valid email address')
  display_name = forms.CharField(max_length=50, required=False, help_text='How to display your name on this site')

  class Meta:
    model = User
    fields = ('username', 'first_name', 'last_name', 'email', 'display_name', 'password1', 'password2', )

