from django.db import models
from django.contrib.auth.models import User
from category.models import Category
from project.models import Project


class Task(models.Model):
    PRIORITY_LEVELS = [
        (1, 'No-priority'),
        (2, 'Low-priority'),
        (3, 'Medium-priority'),
        (4, 'High-priority'),
    ]
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    detail = models.TextField(blank=True)
    priority = models.IntegerField(choices=PRIORITY_LEVELS, default=1)
    is_completed = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='user')
    deadline = models.DateTimeField()



    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
