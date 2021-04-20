from django.db import models
from django.contrib.auth.models import AbstractUser

MAX_PHRASE_LENGTH = 500


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
                                            fields=['slug']) ]


class Acronym(models.Model):
  acronym  = models.CharField(max_length=50)
  added    = models.DateTimeField(auto_now_add=True)

  class Meta:
    constraints = [ models.UniqueConstraint(name='unique_acronyms',
                                            fields=['acronym']) ]


class FinishedGame(models.Model):
  room     = models.ForeignKey(Room, on_delete=models.CASCADE)
  acronym  = models.ForeignKey(Acronym, on_delete=models.RESTRICT)
  started  = models.DateTimeField(null=False)
  finished = models.DateTimeField(null=False,auto_now_add=True)


class ActiveGame(models.Model):
  room     = models.OneToOneField(Room, on_delete=models.CASCADE)
  acronym  = models.ForeignKey(Acronym, on_delete=models.RESTRICT)
  started  = models.DateTimeField(auto_now_add=True)

  # Game phases
  GATHER   = 'G'
  VOTE     = 'V'

  phases   = [ (GATHER,   "Gathering expansions")
             , (VOTE,     "Voting on expansions") ]

  phase    = models.CharField(max_length=1,
                              choices=phases,
                              default=GATHER)

  class Meta:

    # this uniqueness constraint enforces a max of 1 active game per room
    constraints = [ models.UniqueConstraint(name='one_active_game_per_room',
                                            fields=['room']) ]


# most recent phrase sent by a user during a game's gathering round
#
class LatestPhrase(models.Model):
  game    = models.ForeignKey(ActiveGame, on_delete=models.CASCADE)
  user    = models.ForeignKey(User, on_delete=models.CASCADE)
  sent    = models.DateTimeField(null=False)
  phrase  = models.CharField(max_length=MAX_PHRASE_LENGTH, null=False, blank=False)

  class Meta:
    constraints = [ models.UniqueConstraint(name='latest_phrase_one_per_game_user',
                                            fields=['game', 'user']) ]


class FinalPhrase(models.Model):
  game    = models.ForeignKey(FinishedGame, on_delete=models.CASCADE)
  user    = models.ForeignKey(User, on_delete=models.CASCADE)
  phrase  = models.CharField(max_length=MAX_PHRASE_LENGTH, null=False, blank=False)

  class Meta:
    constraints = [ models.UniqueConstraint(name='final_phrase_one_per_game_user',
                                            fields=['game', 'user']) ]


# a single vote by a user for a phrase for a finished game
#
class Vote(models.Model):
  voter     = models.ForeignKey(User, on_delete=models.CASCADE)
  game      = models.ForeignKey(FinishedGame, on_delete=models.CASCADE)
  phrase    = models.ForeignKey(FinalPhrase, on_delete=models.CASCADE)
  voted_on  = models.DateTimeField(null=False)

  class Meta:
    constraints = [ models.UniqueConstraint(name='vote_one_per_game_voter',
                                            fields=['game', 'voter']) ]

