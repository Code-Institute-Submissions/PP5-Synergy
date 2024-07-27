'''serializer for category app'''
from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    workstream = serializers.ReadOnlyField(source='workstream.name')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Category
        fields = [
            'id', 'owner', 'name', 'workstream', 'is_owner',
        ]
