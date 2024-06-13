from rest_framework import serializers
from .models import Task
from category.models import Category


class CategoryForeignKey(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        return Category.objects.filter(workstream=user.profile.default_workstream)


class TaskSerializer(serializers.ModelSerializer):
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
            'is_owner', 'priority', 'is_completed', 'category', 'author',
            'deadline'
        ]


class TaskAssignSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = [
            'owner',
        ]