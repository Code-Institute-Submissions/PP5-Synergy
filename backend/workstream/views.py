'''views for workstream app'''
from rest_framework import generics
from backend.permissions import IsOwnerOrReadOnly, IsWorkstreamOwnerOrReadOnly
from .models import Workstream, Participant
from .serializers import WorkstreamSerializer, ParticipantSerializer


class WorkstreamList(generics.ListAPIView):
    """
    List all workstreams.
    """
    queryset = Workstream.objects.all().order_by('-created_at')
    serializer_class = WorkstreamSerializer


class WorkstreamUserList(generics.ListCreateAPIView):
    """
    List all workstreams for current user
    """
    serializer_class = WorkstreamSerializer

    def perform_create(self, serializer):
        '''
        create workstream with default value for owner
        '''
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all workstream the current
        user is participating in.
        """
        user = self.request.user
        return Workstream.objects.filter(ws_participants__owner=user)


class WorkstreamInviteList(generics.ListAPIView):
    '''
    List of workstreams for user to join
    '''
    serializer_class = WorkstreamSerializer

    def get_queryset(self):
        """
        This view should return a list of all the workstream the current user
        can join excluding currently participating and pending invite.
        """
        user = self.request.user
        return Workstream.objects.exclude(
            ws_participants__owner=user).exclude(ws_invite__user=user)


class WorkstreamDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a workstream and edit or delete it if you own it.
    """
    serializer_class = WorkstreamSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Workstream.objects.all()


class ParticipantList(generics.ListAPIView):
    """
    List participants.
    """
    serializer_class = ParticipantSerializer

    def get_queryset(self):
        """
        This view should return a list of all the participants for the current
        users default workstream.
        """
        user = self.request.user
        return Participant.objects.filter(
            workstream=user.profile.default_workstream)


class ParticipantListActive(generics.ListAPIView):
    """
    List all profiles.
    No create view as profile creation is handled by django signals.
    """
    serializer_class = ParticipantSerializer

    def get_queryset(self):
        """
        This view should return the current user's participant record for the
        current users default workstream.
        """
        user = self.request.user
        return Participant.objects.filter(
            workstream=user.profile.default_workstream, owner=user)


class ParticipantDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a participant and edit or delete it if you own it.
    """
    serializer_class = ParticipantSerializer
    permission_classes = [IsWorkstreamOwnerOrReadOnly]
    queryset = Participant.objects.all()


class GetLeaveWorkstream(generics.ListAPIView):
    serializer_class = ParticipantSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        This view should return the current user's participant record for the
        current users default workstream.
        """
        user = self.request.user
        return Participant.objects.filter(
            workstream=user.profile.default_workstream, owner=user)


class LeaveWorkstream(generics.RetrieveDestroyAPIView):
    '''
    Retrieve and delete participant to remove users form workstream
    '''
    serializer_class = ParticipantSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Participant.objects.all()
