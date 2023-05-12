# from rest_framework.test import APITestCase
# from rest_framework.test import APIClient
# from rest_framework import status
# from django.contrib.auth.models import User
# from songs.models import Song
# from albums.models import Album
# from songs.serializers import SongSerializer
# from django.urls import reverse
# from rest_framework.authtoken.models import Token
# from artists.models import Artist


# class ShowSongTestCase(APITestCase):
#     song_url = reverse('show_song')

#     def setUp(self):
#         self.client = APIClient()
#         self.user = User.objects.create_user(
#             username='testuser', password='testpass')
#         self.token = Token.objects.create(user=self.user)
#         self.client.force_authenticate(user=self.user)

#     def api_authentication(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

#     def test_showsong_api(self):
#         artist = Artist.objects.create(artists='Test Artist')
#         album_ar = Album.objects.create(artist_ids=artist)
#         self.albums = Album.objects.create(album=album_ar)
#         self.song = Song.objects.create(album_id=self.albums)
#         response = self.client.post(self.song_url, {'album': 'Test Album'})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         expected_data = SongSerializer(
#             [self.song], many=True).data
#         self.assertEqual(response.data, expected_data)

#     def test_showsong_api_invalid_album(self):
#         self.client.force_authenticate(user=self.user)
#         response = self.client.post(self.song_url, {'album': 'Invalid Album'})
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
#         self.assertEqual(response.data, {'error': 'Album not found'})

#     def test_showalbums_invalid_album(self):
#         data = {'album': 'Nonexistent Album'}
#         response = self.client.post(self.song_url, data)
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
#         self.assertEqual(response.data, {'error': 'Album not found'})


# # from django.test import SimpleTestCase
# # from django.urls import resolve, reverse
# # from songs.views import showsong
# # from rest_framework.test import APITestCase
# # from rest_framework.authtoken.models import Token
# # from rest_framework import status
# # from django.contrib.auth.models import User
# # # Create your tests here.


# # class SongUrlsTests(SimpleTestCase):
# #     def test_albums(self):
# #         url = reverse('show_song')
# #         # print(resolve(url))
# #         self.assertEquals(resolve(url).func, showsong)
# #         # print(url)


# # class SongApiViewTest(APITestCase):
# #     songs_url = reverse('show_song')

# #     def setUp(self):
# #         self.user = User.objects.create_user(
# #             username='nimra_test', password='12345678')
# #         self.token = Token.objects.create(user=self.user)
# #         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

# #     def tearDown(self):
# #         pass

# #     def test_show_songs_auth(self):
# #         response = self.client.post(self.songs_url)
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
