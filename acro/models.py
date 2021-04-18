from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom user model:
#   https://docs.djangoproject.com/en/3.2/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project

class User(AbstractUser):
  display_name = models.CharField(max_length=50, null=False, blank=True)


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
  started  = models.DateTimeField(auto_now_add=True)
  finished = models.DateTimeField(null=True)



class ActiveGame(models.Model):
  room     = models.ForeignKey(Room, on_delete=models.CASCADE)
  game     = models.ForeignKey(Game, on_delete=models.CASCADE)

  # Game phases
  GATHER   = 'G'
  VOTE     = 'V'

  phases   = [ (GATHER,   "Gathering expansions")
             , (VOTE,     "Voting on expansions")
             ]

  phase    = models.CharField(max_length=1,
                              choices=phases,
                              default=GATHER)

  class Meta:

    # this uniqueness constraint enforces a max of 1 active game per room
    constraints = [ models.UniqueConstraint(name='one_active_game_per_room',
                                            fields=['room'])
                  ]

