# Generated by Django 5.0.3 on 2024-05-02 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0006_room_type_rooms_roomimage_roomamenities'),
    ]

    operations = [
        migrations.CreateModel(
            name='Amenities',
            fields=[
                ('amenities_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
    ]
