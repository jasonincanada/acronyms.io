# Generated by Django 3.2 on 2021-05-08 01:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0023_remove_activegame_phase'),
    ]

    operations = [
        migrations.AddField(
            model_name='activegame',
            name='finishing',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]