# Generated by Django 3.2 on 2021-05-08 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0024_activegame_finishing'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='description',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]