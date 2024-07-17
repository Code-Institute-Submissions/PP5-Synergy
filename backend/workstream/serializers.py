from rest_framework import serializers
from .models import Workstream, Participant
from backend.serializers import CurrentUserSerializer


class WorkstreamSerializer(serializers.ModelSerializer):
    owner = CurrentUserSerializer(read_only=True)
    users = CurrentUserSerializer(many=True, read_only=True)
    is_owner = serializers.SerializerMethodField()
    

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner


    class Meta:
        model = Workstream
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name', 'users', 'is_owner',
        ]

class ParticipantSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    workstream = WorkstreamSerializer(read_only=True)
    is_owner = serializers.SerializerMethodField()
    

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.workstream.owner


    class Meta:
        model = Participant
        fields = [
            'id', 'owner', 'workstream', 'is_staff', 'is_owner',
        ]