from rest_framework import serializers
from .models import Invite
from workstream.models import Workstream


class InviteSerializer(serializers.ModelSerializer):
    accepted = serializers.ReadOnlyField()
    inbound = serializers.ReadOnlyField()
    workstream = serializers.ReadOnlyField(source='workstream.name')


    class Meta:
        model = Invite
        fields = [
            'id', 'created_at', 'created_at', 'workstream', 'user',
            'accepted', 'inbound',
        ]


class WorkstreamForeignKey(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        return Workstream.objects.exclude(ws_participants__owner=user)

class JoinSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    accepted = serializers.ReadOnlyField()
    inbound = serializers.ReadOnlyField()
    workstream = WorkstreamForeignKey()


    class Meta:
        model = Invite
        fields = [
            'id', 'created_at', 'created_at', 'workstream', 'user',
            'accepted', 'inbound',
        ]

class AcceptSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    workstream = serializers.ReadOnlyField(source='workstream.name')
    inbound = serializers.ReadOnlyField()



    class Meta:
        model = Invite
        fields = [
            'id', 'created_at', 'created_at', 'workstream', 'user',
            'accepted', 'inbound',
        ]