'''views for task app'''
from rest_framework import generics
from backend.permissions import (IsOwnerOrReadOnly,
                                 IsAuthorOrReadOnly,
                                 IsParticipantOrReadOnly)
from .models import Task
from .serializers import *


class TaskCreate(generics.CreateAPIView):
    '''
    Task create view
    '''
    serializer_class = TaskCreateSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class TaskListOpen(generics.ListAPIView):
    """
    List all unassigned task in current users default workstream.
    """
    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        This view should return a list of all the tasks which have not been
        assigned to a user, in the current users default workstream.
        """
        user = self.request.user
        return Task.objects.filter(
            category__workstream=user.profile.default_workstream,
            owner__isnull=True)


class TaskListAssigned(generics.ListAPIView):
    """
    List all assigned task in current users default workstream.
    """
    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        This view should return a list of all the tasks which have been
        assigned to a user, in the current users default workstream.
        """
        user = self.request.user
        return Task.objects.filter(
            category__workstream=user.profile.default_workstream,
            owner__isnull=False)


class UserTaskList(generics.ListAPIView):
    """
    List all tasks.
    """
    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        This view should return a list of all the tasks for the current user.
        """
        user = self.request.user
        return Task.objects.filter(owner=user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a task and edit or delete it if you own it.
    """
    serializer_class = TaskCreateSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Task.objects.all()


class TaskAssignAdmin(generics.UpdateAPIView):
    permission_classes = [IsAuthorOrReadOnly]
    serializer_class = TaskAssignSerializer
    queryset = Task.objects.all()


class TaskAssignSelf(generics.UpdateAPIView):
    '''
    Update task and assign current user
    '''
    permission_classes = [IsParticipantOrReadOnly]
    serializer_class = TaskAssignSerializer
    queryset = Task.objects.all()

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)


class TaskUnassignSelf(generics.UpdateAPIView):
    '''
    Update task to remove assigned user
    '''
    permission_classes = [IsParticipantOrReadOnly]
    serializer_class = TaskAssignSerializer
    queryset = Task.objects.all()

    def perform_update(self, serializer):
        serializer.save(owner=None)


class CompleteTask(generics.UpdateAPIView):
    '''
    Update task to completed status
    '''
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TaskCompleteSerializer
    queryset = Task.objects.all()
