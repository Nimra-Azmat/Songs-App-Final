from django.test import SimpleTestCase
from rest_framework.test import APITestCase
from django.urls import resolve, reverse
from artists.views import showallartist
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.models import User
# Create your tests here.


class ArtistUrlsTests(SimpleTestCase):
    def test_artists(self):
        url = reverse('show_artist')
        print(resolve(url))
        self.assertEquals(resolve(url).func, showallartist)
        # print(url)


class ArtistApiViewTest(APITestCase):
    artist_url = reverse('show_artist')

    # def setUp(self):
    #     self.user = User.objects.create_user(
    #         username='nimra', password='nimra12345678')
    #     self.token = Token.objects.create(user=self.user)
    #     self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    # def tearDown(self):
    #     pass

    def test_show_artist_auth(self):
        response = self.client.get(self.artist_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
