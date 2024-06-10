from rest_framework import generics
from backend.permissions import IsOwnerOrReadOnly, IsWorkstreamOwnerOrReadOnly
from .models import Workstream, Participant
from .serializers import WorkstreamSerializer, ParticipantSerializer


class WorkstreamList(generics.ListCreateAPIView):
    """
    List all profiles.
    No create view as profile creation is handled by django signals.
    """
    queryset = Workstream.objects.all().order_by('-created_at')
    serializer_class = WorkstreamSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class WorkstreamDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = WorkstreamSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Workstream.objects.all()


class ParticipantList(generics.ListAPIView):
    """
    List all profiles.
    No create view as profile creation is handled by django signals.
    """
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer



class ParticipantDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = ParticipantSerializer
    permission_classes = [IsWorkstreamOwnerOrReadOnly]
    queryset = Participant.objects.all()