from django.test import TestCase
from django.urls import reverse

from .models import User

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

