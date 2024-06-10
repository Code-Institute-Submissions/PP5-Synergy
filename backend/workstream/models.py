from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


class Workstream(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255, blank=True)
    users = models.ManyToManyField(User, through='Participant', related_name='workstream_users')


    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class Participant(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_participant')
    workstream = models.ForeignKey(Workstream, on_delete=models.CASCADE, related_name='ws_participants')
    is_staff = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.owner.username} in {self.workstream.name}'
    

def assign_owner(sender, instance, created, **kwargs):
    if created:
        Participant.objects.create(owner=instance.owner, workstream=instance, is_staff=True)

post_save.connect(assign_owner, sender=Workstream)