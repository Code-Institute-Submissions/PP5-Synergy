from rest_framework import serializers
from .models import Profile
from workstream.models import Workstream


class UserWorkstreamForeignKey(serializers.PrimaryKeyRelatedField):
    '''class for returning user specific workstream'''
    def get_queryset(self):
        user = self.context['request'].user
        return Workstream.objects.filter(ws_participants__owner=user)


class ProfileSerializer(serializers.ModelSerializer):
    '''serializer for get profile api'''
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    default_workstream = UserWorkstreamForeignKey()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'first_name',
            'last_name', 'avatar', 'is_owner', 'default_workstream',
        ]


class EditProfileSerializer(serializers.ModelSerializer):
    '''serializer for editing profile api'''
    owner = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()
    completed = serializers.ReadOnlyField()
    pending = serializers.ReadOnlyField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'first_name', 'completed', 'pending',
            'last_name', 'avatar', 'is_owner',
        ]


class WorkstreamSwitchSerializer(serializers.ModelSerializer):
    '''serializer for switching user workstream'''
    default_workstream = UserWorkstreamForeignKey()

    class Meta:
        model = Profile
        fields = [
            'default_workstream',
        ]
