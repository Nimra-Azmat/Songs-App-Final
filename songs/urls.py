from django.urls import path
from songs import views

urlpatterns = [
    path("", views.Routes_song),
    path("showsong/", views.showsong, name="show_song"),
]
