# Generated by Django 5.0.3 on 2024-04-20 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0005_remove_hotels_hotelimage_hotelimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotelimage',
            name='image',
            field=models.FileField(upload_to='hotel-images'),
        ),
    ]
