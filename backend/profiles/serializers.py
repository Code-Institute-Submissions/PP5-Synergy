from rest_framework import serializers
from .models import Profile
from workstream.models import Workstream

class UserWorkstreamForeignKey(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        print(Workstream.objects.filter(ws_participants__owner=user))
        return Workstream.objects.filter(ws_participants__owner=user)


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='user.username')
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