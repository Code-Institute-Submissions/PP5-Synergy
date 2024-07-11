from django.urls import path
from task import views

urlpatterns = [
    path('task/', views.TaskList.as_view()),
    path('tasklist/', views.UserTaskList.as_view()),
    path('task/<int:pk>/', views.TaskDetail.as_view()),
    path('task/<int:pk>/admin/', views.TaskAssignAdmin.as_view()),
    path('task/<int:pk>/assign/', views.TaskAssignSelf.as_view()),
]