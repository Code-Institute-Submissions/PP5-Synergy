'''view for category app'''
from rest_framework import generics
from backend.permissions import IsStaffOrReadOnly
from .models import Category
from .serializers import CategorySerializer


class CategoryList(generics.ListCreateAPIView):
    """
    List Category view
    """
    serializer_class = CategorySerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all the categories in the
        current users default workstream
        """
        user = self.request.user
        return Category.objects.filter(
            workstream=user.profile.default_workstream
            )

    def perform_create(self, serializer):
        '''
        Creating new categories by passing default user and default
        workstream
        '''
        serializer.save(
            owner=self.request.user,
            workstream=self.request.user.profile.default_workstream
            )


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve and update category.
    """
    serializer_class = CategorySerializer
    permission_classes = [IsStaffOrReadOnly]
    queryset = Category.objects.all().order_by('-created_at')
