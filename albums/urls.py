from django.urls import path
from albums import views

urlpatterns = [
    path("", views.Routes_album),
    path("showalbums/", views.showalbums, name="show_album"),
]
