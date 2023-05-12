from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from albums.models import Album
from artists.models import Artist
from albums.serializers import AlbumSerializer


class ShowAlbumsApiViewTest(APITestCase):
    url = reverse('show_album')

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', password='testpass')
        self.token = Token.objects.create(user=self.user)
        # self.api_authentication()
        self.client.force_authenticate(user=self.user)

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_showalbums_valid_artist(self):
        artist = Artist.objects.create(artists='Test Artist')
        album = Album.objects.create(artist_ids=artist)

        data = {'artists': 'Test Artist'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = AlbumSerializer([album], many=True).data
        self.assertEqual(response.data, expected_data)

    def test_showalbums_invalid_artist(self):
        data = {'artists': 'Nonexistent Artist'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {'error': 'Artist not found'})

# from django.test import SimpleTestCase
# from rest_framework.test import APITestCase, APIClient
# from django.urls import resolve, reverse
# from albums.views import showalbums
# from rest_framework.authtoken.models import Token
# from rest_framework import status
# from django.contrib.auth.models import User
# # Create your tests here.


# class AlbumUrlsTests(SimpleTestCase):
#     def test_albums(self):
#         url = reverse('show_album')
#         # print(resolve(url))
#         self.assertEquals(resolve(url).func, showalbums)
#         # print(url)


# class AlbumApiViewTest(APITestCase):
#     album_url = reverse('show_album')

#     def setUp(self):
#         self.user = User.objects.create_user(
#             username='nimra_test', password='12345678')
#         self.token = Token.objects.create(user=self.user)
#         self.client = APIClient()
#         self.client.force_authenticate(user=self.user)
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

#     def tearDown(self):
#         pass

#     def test_show_albums_auth(self):
#         data = {'artists': 'artist_test'}
#         response = self.client.post(self.album_url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
