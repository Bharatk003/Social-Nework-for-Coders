# Generated by Django 5.0.6 on 2024-07-13 15:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_user_is_private_followrequest'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='Is_private',
            new_name='is_private',
        ),
    ]
