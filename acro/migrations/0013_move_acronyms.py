# the previous migration added an Acronym table to store the acros
# separate from the Game table, now move them from Game -> Acronym
#
# https://docs.djangoproject.com/en/3.2/topics/migrations/#data-migrations
#

from django.db import migrations


# populate the acronym_id of each game by copying the acronym (still
# stored in the acrotext field) to the Acronym table, or getting the
# existing record if it's already there
#
def copy_acronyms(apps, schema_editor):

  Acronym = apps.get_model('acro', 'Acronym')
  Game    = apps.get_model('acro', 'Game')

  for row in Game.objects.all():

    acro, created = Acronym.objects.get_or_create(acronym=row.acrotext)

    # set the foreign key reference
    row.acronym_id = acro.id
    row.save()


class Migration(migrations.Migration):

    dependencies = [
        ('acro', '0012_game_acronym'),
    ]

    operations = [
        migrations.RunPython(copy_acronyms)
    ]
