# Generated by Django 3.2.4 on 2024-06-10 12:08

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('workstream', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Participants',
            new_name='Participant',
        ),
    ]
