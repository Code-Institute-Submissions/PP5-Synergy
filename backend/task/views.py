from rest_framework import generics
from backend.permissions import IsOwnerOrReadOnly, IsAuthorOrReadOnly, IsParticipantOrReadOnly
from .models import Task
from .serializers import TaskSerializer, TaskAssignSerializer


class TaskList(generics.ListCreateAPIView):
    """
    List all profiles.
    """
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = TaskSerializer
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