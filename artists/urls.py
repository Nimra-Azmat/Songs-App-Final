from django.urls import path
from artists import views

urlpatterns = [
    path("", views.Routes_artist),
    path("showartist/", views.showallartist, name="show_artist"),
]
