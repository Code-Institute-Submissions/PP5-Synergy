from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers


class CurrentUserSerializer(UserDetailsSerializer):
    profile_id = serializers.ReadOnlyField(source='profile.id')
    profile_avatar = serializers.ReadOnlyField(source='profile.image.url')
    default_workstream = serializers.ReadOnlyField(source='profile.default_workstream')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'profile_id', 'profile_avatar', 'default_workstream'
        )
