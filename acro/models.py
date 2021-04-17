from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom user model:
#   https://docs.djangoproject.com/en/3.2/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project

class User(AbstractUser):
    pass

