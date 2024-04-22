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
# router.register(r'rooms', views.RoomView, 'room')
router.register(r'hotels', views.HotelView, 'hotel')
# router.register(r'bookings', views.BookingView, 'booking')
# router.register(r'recomments', views.BookingView, 'reconment')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('apis/', include('todo.urls')),
    # path('api/list-booking/', views.ListBookingView.as_view(), name='list-booking'),
    path('api/token/', views.MyTokenObtainView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/rooms/<int:room_id>/', views.RoomRetrieveUpdateDestroyView.as_view(), name='room-detail'),
    path('api/hotels/<int:hotel_id>/', views.HotelRetrieveUpdateDestroyView.as_view(), name='hotel-detail'),
    path('api/hotel-images/<int:hotel_id>/', views.HotelImageRetrieveUpdateDestroy.as_view(), name='hotel-image-retrieve-update-destroy'),
    path('api/hotels/<int:pk>/images/', views.HotelImageView.as_view({'post': 'multiple_upload'}), name='hotel_images')
    # path('api/bookings/<int:booking_id>/', views.BookingRetrieveUpdateDestroyView.as_view(), name='booking-detail'),
    # path('api/hotels/<int:hotel_id>/rooms/', views.HotelRoomsListView.as_view(), name='hotel-rooms'),
    # path('api/hotels/<int:hotel_id>/rooms/<int:room_id>', views.RoomstoHotelListView.as_view(), name='rooms-to-hotels'),
    # path('api/hotels/<int:hotel_id>/recomments', views.RecommentListView.as_view(), name='recomment'),
    # path('api/hotels/<int:hotel_id>/recomments/<int:comment_id>/', views.RecommentRetrieveUpdateDestroyView.as_view(), name='comment-detail'),
]

