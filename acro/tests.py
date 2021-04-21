from django.test import TestCase
from django.urls import reverse

from .models import ActiveGame, FinishedGame, LatestPhrase, FinalPhrase, User, Vote
from .       import methods


# https://stackoverflow.com/questions/22457557/how-to-test-login-process/22463756#22463756
class LoginTestCase(TestCase):
  fixtures = ['user.json']

  def setUp(self):
    self.credentials = {
      'username': 'test',
      'password': 'testtest123'
    }

  def test_valid_login(self):
    response = self.client.post(reverse('login'), self.credentials, follow=True)
    self.assertTrue(response.context['user'].is_authenticated)

  def test_invalid_login(self):
    self.credentials.update({'password': 'wrongpassword'})
    response = self.client.post(reverse('login'), self.credentials, follow=True)
    self.assertFalse(response.context['user'].is_authenticated)


class PostPhraseTestCase(TestCase):
  fixtures = ['acronyms.json', 'active-games.json', 'user.json', 'rooms.json']

  def setUp(self):

    # log in
    self.credentials = {
      'username': 'test',
      'password': 'testtest123'
    }

    self.client.post(reverse('login'), self.credentials, follow=True)


  def test_post_valid_phrase(self):
    response = self.client.post('/acro/api/game/1/post-phrase/',
                                {'phrase': 'aa bb cc dd ee ff'})

    self.assertJSONEqual(
      str(response.content, encoding='utf8'),
      {'result': 'ok'}
    )

    obj = LatestPhrase.objects           \
                      .filter(game_id=1) \
                      .filter(user_id=1) \
                      .get()

    self.assertTrue(obj.phrase == 'aa bb cc dd ee ff')


  def test_post_invalid_phrase(self):

    tests = [('',            'no words'),         # no words present
             ('abcdef',      'not enough words'), # only the first word provided
             ('a b c d e',   'not enough words'), # missing the last word
             ('b a c d e f', 'invalid for a'),    # right number, first two are invalid
             ]

    for (test, result) in tests:
      response = self.client.post('/acro/api/game/1/post-phrase/',
                                  {'phrase': test})

      self.assertJSONEqual(
        str(response.content, encoding='utf8'),
        {'result': result}
      )



class CloseGameTestCase(TestCase):
  fixtures = ['acronyms.json', 'active-games.json', 'latest-phrase.json',
              'user.json', 'rooms.json']

  def test_close_game(self):
    game_id = 1

    self.assertEqual(0, FinishedGame.objects.count())
    self.assertEqual(0, FinalPhrase .objects.count())
    self.assertEqual(1, ActiveGame  .objects.filter(pk=game_id).count())
    self.assertEqual(2, LatestPhrase.objects.count()             )

    methods.close_game(game_id)

    # the ActiveGame was moved to a FinishedGame
    self.assertEqual(0, ActiveGame  .objects.filter(pk=game_id).count())
    self.assertEqual(1, FinishedGame.objects.filter(room_id=2)                 \
                                            .filter(acronym__acronym='abcdef') \
                                            .count())

    # the LatestPhrases are now FinalPhrases
    self.assertEqual(0, LatestPhrase.objects.count())
    self.assertEqual(2, FinalPhrase .objects.filter(game_id=game_id).count())

    self.assertEqual(1, FinalPhrase.objects           \
                                   .filter(game_id=1) \
                                   .filter(user_id=1) \
                                   .filter(phrase='a b c d e f') \
                                   .count())

    self.assertEqual(1, FinalPhrase.objects           \
                                   .filter(game_id=1) \
                                   .filter(user_id=2) \
                                   .filter(phrase__startswith='alpha bravo charlie') \
                                   .count())



class VoteTestCase(TestCase):
  fixtures = ['acronyms.json', 'final-phrases.json', 'finished-games.json',
              'user.json', 'rooms.json']

  def setUp(self):

    # log in
    self.credentials = {
      'username': 'test',
      'password': 'testtest123'
    }

    self.client.post(reverse('login'), self.credentials, follow=True)


  def test_vote(self):

    self.assertEquals(0, Vote.objects.count())

    response = self.client.post('/acro/api/game/1/vote/',
                               {'phrase': 2})

    self.assertEquals(1, Vote.objects
                             .filter(voter__username='test')
                             .filter(game_id=1)
                             .filter(phrase__phrase__startswith="alpha bravo charlie")
                             .filter(voted_on__isnull=False)
                             .count())

