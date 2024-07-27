from django.db import models
from django.contrib.auth.models import User
from workstream.models import Workstream


class Category(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255, blank=True)
    workstream = models.ForeignKey(
        Workstream, on_delete=models.CASCADE,
        related_name='category_workstream'
        )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
