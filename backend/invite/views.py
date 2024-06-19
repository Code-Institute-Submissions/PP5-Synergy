from rest_framework import generics
from backend.permissions import IsWorkstreamOwnerOrReadOnly, IsInviteOwnerOrReadOnly
from .models import Invite
from .serializers import InviteSerializer, JoinSerializer, AcceptSerializer


class InviteList(generics.ListCreateAPIView):
    """
    List posts or create a post if logged in
    The perform_create method associates the post with the logged in user.
    """
    serializer_class = InviteSerializer
    permission_classes = [IsWorkstreamOwnerOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Invite.objects.filter(workstream=user.profile.default_workstream)
    
    def perform_create(self, serializer):
        serializer.save(
            workstream=self.request.user.profile.default_workstream,
            inbound=False
            )


class InviteDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = AcceptSerializer
    permission_classes = [IsWorkstreamOwnerOrReadOnly]
    queryset = Invite.objects.all().order_by('-created_at')


class JoinList(generics.ListCreateAPIView):
    """
    List posts or create a post if logged in
    The perform_create method associates the post with the logged in user.
    """
    serializer_class = JoinSerializer
    permission_classes = [IsInviteOwnerOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Invite.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            inbound=True
            )


class JoinDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = AcceptSerializer
    permission_classes = [IsInviteOwnerOrReadOnly]
    queryset = Invite.objects.all().order_by('-created_at')