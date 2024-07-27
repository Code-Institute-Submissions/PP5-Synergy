'''views for project app'''
from rest_framework import generics
from backend.permissions import IsStaffOrReadOnly, IsOwnerOrReadOnly
from .models import Project
from .serializers import ProjectSerializer


class ProjectList(generics.ListCreateAPIView):
    """
    List project view api
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        """
        filter list to display active users default workstream categories
        """
        user = self.request.user
        return Project.objects.filter(
            workstream=user.profile.default_workstream)

    def perform_create(self, serializer):
        '''
        create project with default user and workstreams
        '''
        serializer.save(
            owner=self.request.user,
            workstream=self.request.user.profile.default_workstream
            )


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a project and edit or delete it if you own it.
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Project.objects.all()
