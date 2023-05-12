from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("artists/", include("artists.urls"), name="artist"),
    path("albums/", include("albums.urls"), name="album"),
    path("songs/", include("songs.urls"), name="song"),
    # path('api/', include('base.api.urls'), name='base'),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("artist/", TemplateView.as_view(template_name="index.html")),
    path("album/", TemplateView.as_view(template_name="index.html")),
    path("song/", TemplateView.as_view(template_name="index.html")),
    path("login/", TemplateView.as_view(template_name="index.html")),
    path("", TemplateView.as_view(template_name="index.html")),
]
