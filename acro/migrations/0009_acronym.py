# Generated by Django 3.2 on 2021-04-19 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0008_auto_20210418_2115'),
    ]

    operations = [
        migrations.CreateModel(
            name='Acronym',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('acronym', models.CharField(max_length=50)),
                ('added', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]