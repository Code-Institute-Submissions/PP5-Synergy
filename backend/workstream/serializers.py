from rest_framework import serializers
from .models import Workstream


class WorkstreamSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()
    

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner


    class Meta:
        model = Workstream
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name', 'users', 'is_owner',
        ]