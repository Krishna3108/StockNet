# Generated by Django 3.1 on 2020-08-15 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_auto_20200815_1213'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companystock',
            name='Adjclose',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='companystock',
            name='Close',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='companystock',
            name='High',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='companystock',
            name='Low',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='companystock',
            name='Open',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='smindex',
            name='Adjclose',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='smindex',
            name='Close',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='smindex',
            name='High',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='smindex',
            name='Low',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='smindex',
            name='Open',
            field=models.DecimalField(decimal_places=5, max_digits=10, null=True),
        ),
    ]
