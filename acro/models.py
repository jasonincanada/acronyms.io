from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom user model:
#   https://docs.djangoproject.com/en/3.2/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project

class User(AbstractUser):
    pass


class Room(models.Model):
  slug = models.CharField(max_length=50)

  def __str__(self):
    return self.slug

  class Meta:
    constraints = [ models.UniqueConstraint(name='slug_unique',
                                            fields=['slug'])
                  ]


class Game(models.Model):
  room     = models.ForeignKey(Room, on_delete=models.CASCADE)
  acronym  = models.CharField(max_length=50)

  # Game phases
  GATHER   = 'G'
  VOTE     = 'V'
  FINISHED = 'F'

  phases   = [ (GATHER,   "Gathering expansions")
             , (VOTE,     "Voting on expansions")
             , (FINISHED, "Game finished")
             ]

  phase    = models.CharField(max_length=1,
                              choices=phases,
                              default=GATHER)

