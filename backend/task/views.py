from rest_framework import generics
from backend.permissions import IsOwnerOrReadOnly, IsAuthorOrReadOnly, IsParticipantOrReadOnly
from .models import Task
from .serializers import *


class TaskCreate(generics.CreateAPIView):
    serializer_class = TaskCreateSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class TaskListOpen(generics.ListAPIView):
    """
    List all profiles.
    """
    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Task.objects.filter(category__workstream=user.profile.default_workstream, owner__isnull=True)

class TaskListAssigned(generics.ListAPIView):
    """
    List all profiles.
    """
    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Task.objects.filter(category__workstream=user.profile.default_workstream, owner__isnull=False)

class UserTaskList(generics.ListAPIView):
    """
    List all profiles.
    """
    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Task.objects.filter(owner=user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = TaskCreateSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Task.objects.all()


class TaskAssignAdmin(generics.UpdateAPIView):
    permission_classes = [IsAuthorOrReadOnly]
    serializer_class = TaskAssignSerializer
    queryset = Task.objects.all()


class TaskAssignSelf(generics.UpdateAPIView):
    permission_classes = [IsParticipantOrReadOnly]
    serializer_class = TaskAssignSerializer
    queryset = Task.objects.all()

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

class TaskUnassignSelf(generics.UpdateAPIView):
    permission_classes = [IsParticipantOrReadOnly]
    serializer_class = TaskAssignSerializer
    queryset = Task.objects.all()

    def perform_update(self, serializer):
        serializer.save(owner=None)

class CompleteTask(generics.UpdateAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TaskCompleteSerializer
    queryset = Task.objects.all()