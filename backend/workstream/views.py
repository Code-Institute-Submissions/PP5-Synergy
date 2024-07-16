from rest_framework import generics
from backend.permissions import IsOwnerOrReadOnly, IsWorkstreamOwnerOrReadOnly
from .models import Workstream, Participant
from .serializers import WorkstreamSerializer, ParticipantSerializer


class WorkstreamList(generics.ListAPIView):
    """
    List all profiles.
    No create view as profile creation is handled by django signals.
    """
    queryset = Workstream.objects.all().order_by('-created_at')
    serializer_class = WorkstreamSerializer



class WorkstreamUserList(generics.ListCreateAPIView):
    """
    List all profiles.
    No create view as profile creation is handled by django signals.
    """
    serializer_class = WorkstreamSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Workstream.objects.filter(ws_participants__owner=user)


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


class ParticipantListActive(generics.ListAPIView):
    """
    List all profiles.
    No create view as profile creation is handled by django signals.
    """
    serializer_class = ParticipantSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Participant.objects.filter(workstream=user.profile.default_workstream, owner=user)

class ParticipantDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = ParticipantSerializer
    permission_classes = [IsWorkstreamOwnerOrReadOnly]
    queryset = Participant.objects.all()

class GetLeaveWorkstream(generics.ListAPIView):
    serializer_class = ParticipantSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Participant.objects.filter(workstream=user.profile.default_workstream, owner=user)


class LeaveWorkstream(generics.RetrieveDestroyAPIView):
    serializer_class = ParticipantSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Participant.objects.all()