# Generated by Django 3.2.3 on 2021-06-30 23:28

import API.users.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('general', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('name', models.CharField(max_length=150, verbose_name='name')),
                ('age', models.PositiveIntegerField(default=18, verbose_name='age')),
                ('email', models.EmailField(max_length=100, unique=True, verbose_name='email')),
                ('phone', models.CharField(max_length=10, verbose_name='phone')),
                ('image', models.ImageField(blank=True, default='default.jpg', max_length=255, null=True, upload_to=API.users.models.upload_load)),
                ('gender', models.CharField(max_length=2, null=True, verbose_name='Gender')),
                ('token', models.CharField(default=None, max_length=40, null=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('status_delete', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('role', models.ForeignKey(choices=[(2, 'Encargado'), (3, 'Empleado')], on_delete=django.db.models.deletion.CASCADE, to='general.role')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'Usuario',
                'verbose_name_plural': 'Usuarios',
                'db_table': 'user',
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(max_length=100, verbose_name='Accion')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha')),
                ('status_delete', models.BooleanField(default=False, verbose_name='Status Delete')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuario Id')),
            ],
            options={
                'verbose_name': 'Log',
                'verbose_name_plural': 'Logs',
                'db_table': 'Log',
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='CashRegister',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('observations', models.CharField(max_length=50, null=True)),
                ('cash_init', models.FloatField(default=0, null=True)),
                ('cash_end', models.FloatField(default=0, null=True)),
                ('amount_sell', models.FloatField(default=0, null=True)),
                ('amount_purchase', models.FloatField(default=0, null=True)),
                ('amount_total', models.FloatField(default=0, null=True)),
                ('status_delete', models.BooleanField(default=False)),
                ('status', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Cash Register',
                'verbose_name_plural': 'Cash Registers',
                'db_table': 'CashRegister',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='AttendanceHorary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True, verbose_name='Fecha de asistencia')),
                ('check_in', models.TimeField(verbose_name='Hora de entrada')),
                ('check_out', models.TimeField(null=True, verbose_name='Hora de salida')),
                ('status_delete', models.BooleanField(default=False, verbose_name='Status Delete')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'AttendanceHorary',
                'verbose_name_plural': 'AttendancesHorary',
                'db_table': 'AttendanceHorary',
                'ordering': ['id'],
            },
        ),
    ]
