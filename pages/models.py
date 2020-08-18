from django.db import models

# Create your models here.


class SMIndex(models.Model):
    Index = models.CharField(max_length=20)
    Date = models.DateField(null=True)
    Open = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    High = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    Low = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    Close = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    Adjclose = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    Volume = models.IntegerField(null=True)

    def __str__(self):
        return self.Index+"_"+str(self.Date)


class CompanyStock(models.Model):
    Company = models.CharField(max_length=100)
    Date = models.DateField(null=True)
    Open = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    High = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    Low = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    Close = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    Adjclose = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    Volume = models.IntegerField(null=True)

    def __str__(self):
        return self.Company+"_"+str(self.Date)
