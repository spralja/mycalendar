# Generated by Django 3.2.8 on 2021-10-05 15:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_auto_20211005_1755'),
    ]

    operations = [
        migrations.AlterField(
            model_name='day',
            name='week',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.week'),
        ),
    ]
