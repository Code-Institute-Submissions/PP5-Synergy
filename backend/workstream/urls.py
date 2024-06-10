from django.urls import path
from workstream import views

urlpatterns = [
    path('workstream/', views.WorkstreamList.as_view()),
    path('workstream/<int:pk>', views.WorkstreamDetail.as_view()),
]