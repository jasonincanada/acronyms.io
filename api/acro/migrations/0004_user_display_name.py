# Generated by Django 3.2 on 2021-04-18 00:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0003_room_slug_unique'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='display_name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
