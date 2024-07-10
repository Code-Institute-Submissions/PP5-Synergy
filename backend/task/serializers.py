from rest_framework import serializers
from .models import Task
from category.serializers import CategorySerializer
from project.serializers import ProjectSerializer
from backend.serializers import CurrentUserSerializer





class TaskSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='user.username')
    owner = CurrentUserSerializer(read_only=True)
    is_owner = serializers.SerializerMethodField()
    category = CategorySerializer()
    project = ProjectSerializer()
    

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner


    class Meta:
        model = Task
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name', 'detail',
            'is_owner', 'priority', 'is_completed', 'category', 'project', 'author',
            'deadline'
        ]


class TaskAssignSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = [
            'owner',
        ]