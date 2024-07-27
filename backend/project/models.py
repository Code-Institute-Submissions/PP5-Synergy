'''models for project model'''
from django.db import models
from django.contrib.auth.models import User
from workstream.models import Workstream


class Project(models.Model):
    '''
    Project model
    '''
    title = models.CharField(max_length=255)
    workstream = models.ForeignKey(Workstream, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
