from rest_framework import serializers
from .models import Invite
from workstream.models import Workstream


class InviteSerializer(serializers.ModelSerializer):
    accepted = serializers.ReadOnlyField()
    inbound = serializers.ReadOnlyField()
    workstream = serializers.ReadOnlyField(source='workstream.name')
    is_owner = serializers.SerializerMethodField()
    display_name = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.profile.avatar.url')
    

    def get_is_owner(self, obj):
        request = self.context['request']
        return obj.workstream.owner == request.user


    class Meta:
        model = Invite
        fields = [
            'id', 'created_at', 'created_at', 'workstream', 'user',
            'accepted', 'inbound', 'is_owner', 'display_name', 'avatar'
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
    is_owner = serializers.SerializerMethodField()
    display_name = serializers.ReadOnlyField(source='workstream.name')
    avatar = serializers.ReadOnlyField(source='workstream.owner.profile.avatar.url')
    

    def get_is_owner(self, obj):
        request = self.context['request']
        return obj.user == request.user


    class Meta:
        model = Invite
        fields = [
            'id', 'created_at', 'created_at', 'workstream', 'user',
            'accepted', 'inbound', 'is_owner', 'avatar', 'display_name'
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