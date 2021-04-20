from django.test import TestCase

from .models import User

# https://stackoverflow.com/questions/22457557/how-to-test-login-process/22463756#22463756
class LoginTestCase(TestCase):
  fixtures = ['basic.json']

  def setUp(self):
    self.credentials = {
      'username': 'test',
      'password': 'testtest123'
    }

  def test_valid_login(self):
    response = self.client.post('/accounts/login/', self.credentials, follow=True)
    self.assertTrue(response.context['user'].is_authenticated)

  def test_invalid_login(self):
    self.credentials.update({'password': 'wrongpassword'})
    response = self.client.post('/accounts/login/', self.credentials, follow=True)
    self.assertFalse(response.context['user'].is_authenticated)

