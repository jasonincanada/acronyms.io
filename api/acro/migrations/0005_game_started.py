# Generated by Django 3.2 on 2021-04-18 02:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0004_user_display_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='started',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
