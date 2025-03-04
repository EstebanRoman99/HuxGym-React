# Generated by Django 3.2.3 on 2021-06-30 23:28

import API.products.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
                ('description', models.CharField(max_length=100)),
                ('status_delete', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
                'db_table': 'category',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='OperationType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('status_delete', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'OperationType',
                'verbose_name_plural': 'OperationTypes',
                'db_table': 'operationType',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
                ('description', models.TextField(max_length=150)),
                ('price_s', models.FloatField()),
                ('price_c', models.FloatField()),
                ('image', models.ImageField(blank=True, default='photodefault.jpg', max_length=255, null=True, upload_to=API.products.models.upload_load)),
                ('status_delete', models.BooleanField(default=False)),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='products.category')),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
                'db_table': 'product',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('phone', models.CharField(blank=True, max_length=10, null=True)),
                ('rfc', models.CharField(max_length=13)),
                ('status_delete', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Provider',
                'verbose_name_plural': 'Providers',
                'db_table': 'provider',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('amount', models.PositiveBigIntegerField()),
                ('status_delete', models.BooleanField(default=False)),
                ('product_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
            options={
                'verbose_name': 'Stock',
                'verbose_name_plural': 'Stocks',
                'db_table': 'stock',
                'ordering': ['id'],
            },
        ),
        migrations.AddField(
            model_name='product',
            name='provider_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='products.provider'),
        ),
        migrations.CreateModel(
            name='Operation',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('amount', models.IntegerField()),
                ('description', models.TextField(max_length=100)),
                ('status_delete', models.BooleanField(default=False)),
                ('operationType_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.operationtype')),
            ],
            options={
                'verbose_name': 'Operation',
                'verbose_name_plural': 'Operations',
                'db_table': 'operation',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='HistoryInventory',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField(auto_now_add=True, verbose_name='Fecha de acción')),
                ('amount', models.IntegerField()),
                ('status_delete', models.BooleanField(default=False)),
                ('operation_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.operation')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
            options={
                'verbose_name': 'HistoryInventory',
                'verbose_name_plural': 'HistoryInventorys',
                'db_table': 'historyInventory',
                'ordering': ['id'],
            },
        ),
    ]
