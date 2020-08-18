from django.urls import path
from .views import *
urlpatterns = [
    path('smindexes/<str:stocks>/<int:id>/', SMIndexstocksingle),
    path('smindexes/<str:stocks>/', SMIndexstockrange),
    path('companies/<str:company>/<int:id>/', CompanyStocksingle),
    path('companies/<str:company>/', CompanyStockrange),
    path('users/<int:id>', UserSingle),
    path('users/', UserAll)
]
