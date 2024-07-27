'''serializer for task app'''
from rest_framework import serializers
from .models import Task
from category.models import Category
from category.serializers import CategorySerializer
from project.serializers import ProjectSerializer
from backend.serializers import CurrentUserSerializer


class CategoryForeignKey(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        return Category.objects.filter(
            workstream=user.profile.default_workstream)


class TaskCreateSerializer(serializers.ModelSerializer):
    '''
    serializer for creating task
    '''
    author = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()
    category = CategoryForeignKey()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Task
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name', 'detail',
            'is_owner', 'priority', 'is_completed', 'category',
            'project', 'author',
            'deadline'
        ]


class TaskSerializer(serializers.ModelSerializer):
    '''
    serializer for task list
    '''
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
            'is_owner', 'priority', 'is_completed', 'category',
            'project', 'author', 'deadline'
        ]


class TaskAssignSerializer(serializers.ModelSerializer):
    '''
    serializer for assigning user to task
    '''

    class Meta:
        model = Task
        fields = [
            'owner',
        ]


class TaskCompleteSerializer(serializers.ModelSerializer):
    '''
    serializer for making tasks as completed
    '''

    class Meta:
        model = Task
        fields = [
            'is_completed',
        ]
