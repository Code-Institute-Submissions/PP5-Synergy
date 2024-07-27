'''Models for profiles app'''
from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from workstream.models import Workstream


class Profile(models.Model):
    '''Profile model'''
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(
        upload_to='images/avatar/', default='../default_profile_dkfqgb'
    )
    default_workstream = models.ForeignKey(
        Workstream, null=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s profile"


def create_profile(sender, instance, created, **kwargs):
    '''Signal to create profile when user created'''
    if created:
        Profile.objects.create(owner=instance)


def assign_default(sender, instance, created, **kwargs):
    '''signal to assign default workstream when created'''
    if created:
        profile = Profile.objects.get(owner=instance.owner)
        profile.default_workstream = instance
        profile.save()


post_save.connect(create_profile, sender=User)

post_save.connect(assign_default, sender=Workstream)
