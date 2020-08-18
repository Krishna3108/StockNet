from rest_framework import serializers
from pages.models import SMIndex, CompanyStock
from django.contrib.auth.admin import User


class SMIndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = SMIndex
        fields = ('Index', 'Date', 'Open', 'High',
                  'Low', 'Close', 'Adjclose', 'Volume')


class CompanyStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyStock
        fields = ('Company', 'Date', 'Open', 'High',
                  'Low', 'Close', 'Adjclose', 'Volume')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'first_name', 'username', 'email', 'last_login')
