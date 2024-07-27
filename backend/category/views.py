from rest_framework import generics
from backend.permissions import IsStaffOrReadOnly
from .models import Category
from .serializers import CategorySerializer


class CategoryList(generics.ListCreateAPIView):
    """
    List posts or create a post if logged in
    The perform_create method associates the post with the logged in user.
    """
    serializer_class = CategorySerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Category.objects.filter(
            workstream=user.profile.default_workstream
            )

    def perform_create(self, serializer):
        serializer.save(
            owner=self.request.user,
            workstream=self.request.user.profile.default_workstream
            )


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = CategorySerializer
    permission_classes = [IsStaffOrReadOnly]
    queryset = Category.objects.all().order_by('-created_at')
