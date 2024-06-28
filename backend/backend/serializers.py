from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers


class CurrentUserSerializer(UserDetailsSerializer):
    profile_id = serializers.ReadOnlyField(source='profile.id')
    profile_avatar = serializers.ReadOnlyField(source='profile.avatar.url')
    default_workstream = serializers.ReadOnlyField(source='profile.default_workstream.name')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'profile_id', 'profile_avatar', 'default_workstream'
        )
