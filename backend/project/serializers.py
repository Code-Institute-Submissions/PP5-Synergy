'''serialiser for project app'''
from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    '''
    Project serializer
    '''
    owner = serializers.ReadOnlyField(source='owner.username')
    workstream = serializers.ReadOnlyField(source='workstream.name')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Project
        fields = [
            'id', 'owner', 'title', 'workstream', 'is_owner',
        ]
