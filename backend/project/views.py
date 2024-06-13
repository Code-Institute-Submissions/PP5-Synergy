from rest_framework import generics
from backend.permissions import IsStaffOrReadOnly, IsOwnerOrReadOnly
from .models import Project
from .serializers import ProjectSerializer


class ProjectList(generics.ListCreateAPIView):
    """
    List posts or create a post if logged in
    The perform_create method associates the post with the logged in user.
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Project.objects.filter(workstream=user.profile.default_workstream)
    
    def perform_create(self, serializer):
        serializer.save(
            owner=self.request.user,
            workstream=self.request.user.profile.default_workstream
            )


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Project.objects.all()