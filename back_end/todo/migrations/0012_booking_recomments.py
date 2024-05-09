# Generated by Django 5.0.3 on 2024-05-09 04:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0011_alter_users_images'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('booking_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=200)),
                ('phonenumber', models.IntegerField()),
                ('address', models.CharField()),
                ('checkin', models.DateField()),
                ('checkout', models.DateField()),
                ('total', models.IntegerField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(choices=[('active', 'Active'), ('processing', 'Processing'), ('hide', 'Hide')], default='processing', max_length=10)),
                ('accommodations', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.accommodations')),
                ('rooms', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.rooms')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Recomments',
            fields=[
                ('comment_id', models.AutoField(primary_key=True, serialize=False)),
                ('descriptions', models.TextField()),
                ('rating', models.IntegerField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('accommodations', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.accommodations')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]