from rest_framework.response import Response
from rest_framework.decorators import api_view
# , permission_classes
from .models import Artist
from django.core.paginator import Paginator
from rest_framework import status
# from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
def Routes_artist(request):
    routes = ["showartist/"]
    return Response(routes)


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def showallartist(request):
    try:
        artist_queryset = Artist.objects.values_list("artists", flat=True)
        paginator = Paginator(artist_queryset, 5)
        page_number = request.GET.get("page")
        artist_page = paginator.get_page(page_number)
        artist_list = list(artist_page)
        data = {
            "artists": artist_list,
            "links": {
                "previous": artist_page.previous_page_number()
                if artist_page.has_previous()
                else None,
                "next": artist_page.next_page_number()
                if artist_page.has_next()
                else None,
            },
        }
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
