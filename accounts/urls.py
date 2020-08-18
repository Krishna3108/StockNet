from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name="register"),
    path('checkUser/', views.checkUser, name="checkUser"),
    path('logout/', views.logout, name="logout")
]
