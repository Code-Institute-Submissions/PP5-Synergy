from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    workstream = serializers.ReadOnlyField(source='workstream.name')


    class Meta:
        model = Category
        fields = [
            'id', 'owner', 'name', 'workstream'
        ]