# Generated by Django 3.2 on 2021-04-19 23:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0019_alter_latestphrase_phrase'),
    ]

    operations = [
        migrations.CreateModel(
            name='FinalPhrase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phrase', models.CharField(max_length=500)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='acro.finishedgame')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddConstraint(
            model_name='finalphrase',
            constraint=models.UniqueConstraint(fields=('game', 'user'), name='final_phrase_one_per_game_user'),
        ),
    ]
