# Generated by Django 3.2 on 2021-04-19 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0009_acronym'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='acronym',
            constraint=models.UniqueConstraint(fields=('acronym',), name='unique_acronyms'),
        ),
    ]
