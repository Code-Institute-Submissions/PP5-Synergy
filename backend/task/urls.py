from django.urls import path
from task import views

urlpatterns = [
    path('task/', views.TaskList.as_view()),
    path('task/<int:pk>/', views.TaskDetail.as_view()),
]