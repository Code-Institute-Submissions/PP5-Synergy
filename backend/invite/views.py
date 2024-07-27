'''views for invites app'''
from rest_framework import generics
from backend.permissions import (IsWorkstreamOwnerOrReadOnly,
                                 IsInviteOwnerOrReadOnly,
                                 InvitePermissions
                                 )
from .models import Invite
from .serializers import InviteSerializer, JoinSerializer, AcceptSerializer


class InviteList(generics.ListCreateAPIView):
    """
    List invites or create new
    """
    serializer_class = InviteSerializer
    permission_classes = [IsWorkstreamOwnerOrReadOnly]

    def get_queryset(self):
        """
        filter list to display users default workstream invites
        """
        user = self.request.user
        return Invite.objects.filter(
            workstream=user.profile.default_workstream)

    def perform_create(self, serializer):
        '''
        workstream invites create with default values for workstream
        and inbound
        '''
        serializer.save(
            workstream=self.request.user.profile.default_workstream,
            inbound=False
            )


class InviteDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a invite and edit if you are the recipient
    or delete it if you created it.
    """
    serializer_class = AcceptSerializer
    permission_classes = [IsWorkstreamOwnerOrReadOnly]
    queryset = Invite.objects.all().order_by('-created_at')


class JoinList(generics.ListCreateAPIView):
    """
    List workstream join request
    """
    serializer_class = JoinSerializer
    permission_classes = [IsInviteOwnerOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all invites the user has
        requested to join
        """
        user = self.request.user
        return Invite.objects.filter(user=user)

    def perform_create(self, serializer):
        '''
        Creating join requested with default values for user and inbound
        '''
        serializer.save(
            user=self.request.user,
            inbound=True
            )


class JoinDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a workstream join request and edit if you are the workstream
    owner or delete it if you created it.
    """
    serializer_class = AcceptSerializer
    permission_classes = [InvitePermissions]
    queryset = Invite.objects.all().order_by('-created_at')
