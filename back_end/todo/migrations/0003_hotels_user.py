# Generated by Django 5.0.3 on 2024-04-29 14:37

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_accommodation_type_hotels_acctype'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotels',
            name='user',
            field=models.ForeignKey(default=int, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
