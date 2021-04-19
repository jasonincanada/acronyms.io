# Generated by Django 3.2 on 2021-04-19 21:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0013_move_acronyms'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='acronym',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='acro.acronym'),
        ),
    ]