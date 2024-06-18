from django.urls import path
from invite import views

urlpatterns = [
    path('invite/', views.InviteList.as_view()),
    path('invite/<int:pk>/', views.InviteDetail.as_view()),
]