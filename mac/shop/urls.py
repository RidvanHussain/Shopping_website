from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    
    path('', views.index, name='ShopHome'),
    path('about/', views.about, name='AboutUs'),
    path('contact/', views.contact, name='ContactUs'),
    path('tracker/', views.tracker, name='Tracker'),
    path('search/', views.search, name='Search'),
    path('products/<int:product_id>/', views.productView, name='ProductView'),
    path('checkout/', views.checkout, name='Checkout'),
    path('signup/', views.signup, name='Signup'),
    path('signin/', views.signin, name='Signin'),
    path('logout/', views.signout, name='Logout'),
    path('api/products/', views.product_api, name='ProductAPI'),


    

]
