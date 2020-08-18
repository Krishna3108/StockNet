from rest_framework import generics
from pages.models import SMIndex, CompanyStock
from .serializers import *
from django.shortcuts import HttpResponse
from rest_framework.renderers import JSONRenderer
from django.contrib.auth.admin import User
from accounts.forms import UserRegForm
from django.views.decorators.csrf import csrf_exempt


class JSONResponse(HttpResponse):
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


def SMIndexstocksingle(request, stocks, id):
    try:

        sMIndexs = SMIndex.objects.filter(Index=stocks).order_by('-Date')[id]
    except:
        return JSONResponse({'detail': 'Server Error', 'message': 'Data not found'}, status=400)

    if request.method == 'GET':
        serializer = SMIndexSerializer(sMIndexs)
        return JSONResponse({'detail': 'success', 'message': serializer.data})


def SMIndexstockrange(request, stocks):
    try:
        if SMIndex.objects.filter(Index=stocks).exists():
            sMIndexs = SMIndex.objects.filter(Index=stocks).order_by('-Date')
        else:
            raise
    except:
        return JSONResponse({'detail': 'Server Error', 'message': 'Data not found'}, status=400)

    if request.method == 'GET':
        serializer = SMIndexSerializer(sMIndexs, many=True)
        return JSONResponse({'detail': 'success', 'message': serializer.data})


def CompanyStockrange(request, company):
    try:
        if CompanyStock.objects.filter(Company=company).exists():
            companyStock = CompanyStock.objects.filter(
                Company=company).order_by('-Date')
        else:
            raise
    except:
        return JSONResponse({'detail': 'Server Error', 'message': 'Data not found'}, status=400)

    if request.method == 'GET':
        serializer = CompanyStockSerializer(companyStock, many=True)
        return JSONResponse({'detail': 'success', 'message': serializer.data})


def CompanyStocksingle(request, company, id):
    try:

        companyStock = CompanyStock.objects.filter(
            Company=company).order_by('-Date')[id]
    except:
        return JSONResponse({'detail': 'Server Error', 'message': 'Data not found'}, status=400)

    if request.method == 'GET':
        serializer = CompanyStockSerializer(companyStock)
        return JSONResponse({'detail': 'success', 'message': serializer.data})


def UserSingle(request, id):
    try:
        user = User.objects.get(pk=id)
    except:
        return JSONResponse({'detail': 'Server Error', 'message': 'Data not found'}, status=400)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JSONResponse({'detail': 'success', 'message': serializer.data})


@csrf_exempt
def UserAll(request):
    try:
        user = User.objects.all()
    except:
        return JSONResponse({'detail': 'Server Error', 'message': 'Data not found'}, status=400)
    if request.method == 'GET':
        serializer = UserSerializer(user, many=True)
        return JSONResponse({'detail': 'success', 'message': serializer.data})
    if request.method == 'POST':
        try:
            form = UserRegForm(request.POST)
            if form.is_valid():
                form = form.cleaned_data
                user = User.objects.create_user(
                    username=form['username'], first_name=form['first_name'], email=form['email'], password=form['password1'])
                user.save()
                return JSONResponse({'detail': 'success', 'message': "Registration Successfull", 'Data': form})
            else:
                return JSONResponse({'detail': 'Server Error', 'message': 'Wrong Input'}, status=400)
        except:
            return JSONResponse({'detail': 'Server Error', 'message': 'Wrong Input format'}, status=400)
