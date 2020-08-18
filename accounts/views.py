from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.admin import User
from django.core.exceptions import ObjectDoesNotExist
from .forms import UserRegForm
from django.contrib import messages, auth
from django.contrib.auth.admin import User
from django.conf import settings
from django.contrib.auth.decorators import login_required

# Create your views here.


def register(request):
    if request.user.is_authenticated:
        user = request.user
        return redirect('home')
    if request.method == "POST" and request.POST.get("formflag") == "0":
        form = UserRegForm(request.POST)
        if form.is_valid():
            form = form.cleaned_data
            user = User.objects.create_user(
                username=form['username'], first_name=form['first_name'], email=form['email'], password=form['password1'])
            user.save()
            messages.info(request, "")
            messages.success(request, "Registration Successful")
            return redirect('register')
        else:
            if form['email'].errors:
                messages.warning(
                    request, "A User with the Email already exists")
            else:
                messages.warning(request, "Something Went Wrong")
            return redirect('register')
    elif request.method == "POST" and request.POST.get("formflag") == "1":
        username = request.POST["username"]
        password = request.POST["password"]
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request, user)
            messages.success(request, "Logged in Successfully")
            return redirect('home')
        else:
            messages.info(request, "Invalid Credentials")
            return redirect('register')
    # if request.method == "POST":
    #     messages.info(request, "Invalid credentials")
    #     messages.error(request, "Invalid Credentials")
    #     return redirect('register')
    else:
        return render(request, 'accounts/signup.html')


def checkUser(request):
    if request.method == "POST":
        response_data = {}
        loginUser = request.POST["user"]
        user = None
        try:
            try:
                user = User.objects.get(username=loginUser)
            except ObjectDoesNotExist as e:
                pass
            except Exception as e:
                raise e
            if not user:
                response_data["is_success"] = True
            else:
                response_data["is_success"] = False
        except Exception as e:
            response_data["is_success"] = False
            response_data["msg"] = "Some error occurred. Please let Admin know."

        return JsonResponse(response_data)
    else:
        return redirect('login')


def logout(request):
    if request.method == "POST":
        auth.logout(request)
        messages.success(request, 'You are now logged out')
        return redirect('register')
