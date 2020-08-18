from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
# Register your models here.


class SMIndexAdmin(ImportExportModelAdmin):
    list_display = ('__str__', 'Date', 'Open', 'High',
                    'Low', 'Close', 'Adjclose', 'Volume',)


class CompanyStockAdmin(ImportExportModelAdmin):
    list_display = ('__str__', 'Date', 'Open', 'High',
                    'Low', 'Close', 'Adjclose', 'Volume',)


admin.site.register(SMIndex, SMIndexAdmin)
admin.site.register(CompanyStock, CompanyStockAdmin)
