# Generated by Django 3.2 on 2021-04-19 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0016_add_finishedgame_remove_game'),
    ]

    operations = [
        migrations.AlterField(
            model_name='finishedgame',
            name='finished',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
