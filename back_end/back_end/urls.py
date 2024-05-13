"""
URL configuration for back_end project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from todo import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')
router.register(r'amenities', views.AmenitiesView, 'amenities')
router.register(r'rooms', views.RoomView, 'room')
router.register(r'room-images', views.RoomImageView, 'room-images')
router.register(r'room-types', views.RoomTypeView, 'room-type')
router.register(r'room-amenities', views.RoomAmenitiesView, 'room-amenities')
router.register(r'accommodations', views.AccommodationView, 'accommodation')
router.register(r'accommodation-images', views.AccommodationImageView, 'accommodation-images')
router.register(r'accommodation-types', views.AccommodationTypeView, 'accommodation-type')
<<<<<<< HEAD
router.register(r'accommodation-utilities', views.AccommodationUtilitiesView, 'accommodation-utilities')
router.register(r'bookings', views.BookingView, 'booking')
router.register(r'recomments', views.BookingView, 'reconment')
=======
# router.register(r'bookings', views.BookingView, 'booking')
# router.register(r'recomments', views.BookingView, 'reconment')
>>>>>>> parent of e715492 (Update page home add acc detail)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('apis/', include('todo.urls')),
    path('api/token/', views.MyTokenObtainView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/amenities/<int:amenities_id>/', views.AmenitiesRetrieveUpdateDestroy.as_view(), name='amenities-details'),
    path('api/accommodations/<int:accommodations_id>/rooms/', views.ListRooms_in_Accommodation_View.as_view(), name='list-room'),
    path('api/accommodations/<int:accommodations_id>/rooms/<int:room_id>', views.RoomDetails_in_Accommodation_View.as_view(), name='room-detail'),
    path('api/room-images/<int:room_id>/', views.RoomImageRetrieveUpdateDestroy.as_view(), name='room-image-retrieve-update-destroy'),
    path('api/room-types/<int:room_id>/', views.RoomTypeRetrieveUpdateDestroy.as_view(), name='room-type-retrieve-update-destroy'),
    path('api/room-amenities/<int:room_id>/', views.RoomAmenitiesRetrieveUpdateDestroy.as_view(), name='room-amenities-retrieve-update-destroy'),
    path('api/accommodations/<int:accommodations_id>/', views.AccommodationRetrieveUpdateDestroy.as_view(), name='accommodation-detail'),
    path('api/accommodation-images/<int:accommodations_id>/', views.AccommodationImageRetrieveUpdateDestroy.as_view(), name='accommodation-image-retrieve-update-destroy'),
<<<<<<< HEAD
    path('api/accommodation-types/<int:accommodations_id>/', views.AccommodationTypeRetrieveUpdateDestroy.as_view(), name='accommodation-type-retrieve-update-destroy'), 
    path('api/accommodation-utilities/<int:accommodations_id>/', views.AccommodationUtilitiesRetrieveUpdateDestroy.as_view(), name='accommodations-utilities-retrieve-update-destroy'),
    path('api/list-booking/', views.ListBookingView.as_view(), name='list-booking'),
    path('api/bookings/<int:booking_id>/', views.BookingRetrieveUpdateDestroyView.as_view(), name='booking-detail'),
    path('api/accommodations/<int:accommodations_id>/recomments', views.RecommentListView.as_view(), name='recomment'),
    path('api/accommodations/<int:accommodations_id>/recomments/<int:comment_id>/', views.RecommentRetrieveUpdateDestroyView.as_view(), name='comment-detail'),
=======
    path('api/accommodation-types/<int:accommodations_id>/', views.AccommodationTypeRetrieveUpdateDestroy.as_view(), name='accommodation-type-retrieve-update-destroy'),
    
    # path('api/list-booking/', views.ListBookingView.as_view(), name='list-booking'),
    # path('api/hotels/<int:hotel_id>/images/', views.HotelImageView.as_view(), name='hotel-images')
    # path('api/bookings/<int:booking_id>/', views.BookingRetrieveUpdateDestroyView.as_view(), name='booking-detail'),
    # path('api/hotels/<int:hotel_id>/rooms/', views.HotelRoomsListView.as_view(), name='hotel-rooms'),
    # path('api/hotels/<int:hotel_id>/rooms/<int:room_id>', views.RoomstoHotelListView.as_view(), name='rooms-to-hotels'),
    # path('api/hotels/<int:hotel_id>/recomments', views.RecommentListView.as_view(), name='recomment'),
    # path('api/hotels/<int:hotel_id>/recomments/<int:comment_id>/', views.RecommentRetrieveUpdateDestroyView.as_view(), name='comment-detail'),
>>>>>>> parent of e715492 (Update page home add acc detail)
]

