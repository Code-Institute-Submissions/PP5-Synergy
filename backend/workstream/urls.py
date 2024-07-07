from django.urls import path
from workstream import views

urlpatterns = [
    path('workstream/', views.WorkstreamList.as_view()),
    path('workstream/active/', views.ParticipantListActive.as_view()),
    path('workstream/participant/', views.ParticipantList.as_view()),
    path('workstream/<int:pk>/', views.WorkstreamDetail.as_view()),
    path('workstream/participant/<int:pk>/', views.ParticipantDetail.as_view()),
]