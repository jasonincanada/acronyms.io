# Generated by Django 3.2 on 2021-04-19 21:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0014_game_acronym_non_nullable'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='acrotext',
        ),
    ]
