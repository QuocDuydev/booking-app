# Generated by Django 5.0.3 on 2024-05-06 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0008_remove_users_joined_users_address_users_createdat_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='images',
            field=models.ImageField(default='https://asset.cloudinary.com/dzi8e6scb/860fcda12800f906eb60aaffaebe78c9', upload_to='booking-app-images'),
        ),
    ]
