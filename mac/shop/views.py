from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import Product,Category,SubCategory,Contact,Order
from math import ceil
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse


# Create your views here.
def index(request):
    
    allProds = []
    catprods = Product.objects.values('category', 'product_id')
    cats = set()
    for item in catprods:
        cats.add(item['category'])
    for cat in cats:
        prod = Product.objects.filter(category=cat)
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))
        allProds.append([prod, range(1, nSlides), n])
    params = {'allProds': allProds}
    return render(request, 'shop/index.html', params)

def about(request):
    return render(request, 'shop/about.html')
    
def contact(request):
    if request.method == 'POST':
        name=request.POST.get("name",'')
        email=request.POST.get("email",'')
        phone=request.POST.get("phone",'')
        desc=request.POST.get("desc",'')
        contact=Contact(name=name,email=email,phone=phone,desc=desc)
        contact.save()
    return render(request, 'shop/contact.html')

def tracker(request):
    return render(request, 'shop/tracker.html')

def search(request):
    return render(request, 'shop/search.html')

def productView(request, product_id):
    product = Product.objects.get(product_id=product_id)
    return render(request, 'shop/prodView.html', {'product': product})


@login_required(login_url='/shop/signin/')
def checkout(request):
    if request.method == "POST":
        items_json = request.POST.get('items_json', '')
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        address = request.POST.get('address', '')
        phone = request.POST.get('phone', '')

        order = Order(
            items_json=items_json,
            name=name,
            email=email,
            address=address,
            phone=phone
        )
        order.save()

        return render(request, 'shop/checkout.html', {'thank': True, 'id': order.order_id})

    return render(request, 'shop/checkout.html')


# ---------- SIGN UP ----------
def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists!")
            return redirect('Signup')

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        messages.success(request, "Account created successfully!")
        return redirect('Signin')
    return render(request, 'shop/signup.html')


# ---------- SIGN IN ----------
def signin(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}!")
            return redirect('ShopHome')
        else:
            messages.error(request, "Invalid credentials!")
            return redirect('Signin')
    return render(request, 'shop/signin.html')


# ---------- LOGOUT ----------
def signout(request):
    logout(request)
    messages.success(request, "You have been logged out successfully!")
    return redirect('ShopHome')


def product_api(request):
    products = Product.objects.all().values('product_id', 'product_name', 'price')
    return JsonResponse(list(products), safe=False)

