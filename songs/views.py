from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Song
from albums.models import Album
from songs.serializers import SongSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def Routes_song(request):
    routes = [
        'showsong/'
    ]
    return Response(routes)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def showsong(request):
    try:
        al = request.data.get('album')
        album = Album.objects.get(album=al)
        rr = Song.objects.filter(album_id=album)
        rr_ser = SongSerializer(rr, many=True)
        return Response(rr_ser.data)
    except Album.DoesNotExist:
        return Response({'error': 'Album not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
