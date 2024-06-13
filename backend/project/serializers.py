from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    workstream = serializers.ReadOnlyField(source='workstream.name')


    class Meta:
        model = Project
        fields = [
            'id', 'owner', 'title', 'workstream'
        ]