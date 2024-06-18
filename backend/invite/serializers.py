from rest_framework import serializers
from .models import Invite


class InviteSerializer(serializers.ModelSerializer):
    workstream = serializers.ReadOnlyField(source='workstream.name')


    class Meta:
        model = Invite
        fields = [
            'id', 'created_at', 'created_at', 'workstream', 'user',
            'accepted', 'inbound',
        ]