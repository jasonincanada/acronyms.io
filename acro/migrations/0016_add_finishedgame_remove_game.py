# Generated by Django 3.2 on 2021-04-19 22:35

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0015_remove_game_acrotext'),
    ]

    operations = [
        migrations.CreateModel(
            name='FinishedGame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('started', models.DateTimeField()),
                ('finished', models.DateTimeField()),
                ('acronym', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='acro.acronym')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='acro.room')),
            ],
        ),
        migrations.RemoveField(
            model_name='activegame',
            name='game',
        ),
        migrations.AddField(
            model_name='activegame',
            name='acronym',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.RESTRICT, to='acro.acronym'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='activegame',
            name='started',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Game',
        ),
    ]
