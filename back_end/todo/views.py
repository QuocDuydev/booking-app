from .validation import custom_validation
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import  IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import generics
from .serializers import UserSerializer, UserSignupSerializers, AccommodationImageSerializer, AccommodationTypeSerializer, AccommodationSerializer, RoomAmenitiesSerializer, RoomTypeSerializer, RoomSerializer, RoomImageSerializer, AmenitiesSerializer
from .models import Users, AccommodationImage, Accommodation_type, Accommodations, Rooms, RoomImage, Room_type, RoomAmenities, Amenities

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainView(TokenObtainPairView):
     serializer_class = MyTokenObtainPairSerializer

class UserSignup(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserSignupSerializers(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = Users.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
        password = make_password(serializer.validated_data['password'])
        serializer.validated_data['password'] = password
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    
# Accommodation
class AccommodationView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Accommodations.objects.all()
    serializer_class = AccommodationSerializer

class AccommodationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Accommodations.objects.all()
    serializer_class = AccommodationSerializer

class AccommodationTypeView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Accommodation_type.objects.all()
    serializer_class = AccommodationTypeSerializer
    
class AccommodationTypeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Accommodation_type.objects.all()
    serializer_class = AccommodationTypeSerializer
    
class AccommodationImageView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = AccommodationImage.objects.all()
    serializer_class = AccommodationImageSerializer

class AccommodationImageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = AccommodationImage.objects.all()
    serializer_class = AccommodationImageSerializer

# Room
class RoomView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Rooms.objects.all()
    serializer_class = RoomSerializer

class RoomRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Rooms.objects.all()
    serializer_class = RoomSerializer

class RoomTypeView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Room_type.objects.all()
    serializer_class = RoomTypeSerializer
    
class RoomTypeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Room_type.objects.all()
    serializer_class = RoomTypeSerializer
    
class RoomImageView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = RoomImage.objects.all()
    serializer_class = RoomImageSerializer

class RoomImageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = RoomImage.objects.all()
    serializer_class = RoomImageSerializer

class RoomAmenitiesView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = RoomAmenities.objects.all()
    serializer_class = RoomAmenitiesSerializer

class RoomAmenitiesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = RoomAmenities.objects.all()
    serializer_class = RoomAmenitiesSerializer

class ListRooms_in_Accommodation_View(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, accommodations_id, format=None):
        rooms = Rooms.objects.filter(accommodations_id=accommodations_id)
        serializer = RoomSerializer(rooms, many=True, context={'request': request})
        return Response(serializer.data)
    
class RoomDetails_in_Accommodation_View(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, accommodations_id, room_id, format=None):
        rooms = Rooms.objects.filter(accommodations_id=accommodations_id, room_id=room_id)
        serializer = RoomSerializer(rooms, many=True, context={'request': request})
        return Response(serializer.data)

class AmenitiesView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Amenities.objects.all()
    serializer_class = AmenitiesSerializer

class AmenitiesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Amenities.objects.all()
    serializer_class = AmenitiesSerializer
    
# class BookingView(viewsets.ModelViewSet):
#     serializer_class = BookingSerializer
#     queryset = Booking.objects.all()

# class ListBookingView(generics.ListCreateAPIView):
#     serializer_class = BookingSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user_id = self.request.user.id
#         return Booking.objects.filter(user_id=user_id)

# class BookingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Booking.objects.all()
#     serializer_class = BookingSerializer
#     def create(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         # Lấy user_id từ tài khoản đang đăng nhập
#         user = request.user
#         serializer.save(user_id=user)  
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     permission_classes = [IsAuthenticated]



    
# class RecommentListView(generics.ListCreateAPIView):
#     permission_classes = [permissions.AllowAny]
#     serializer_class = RecommentSerializer

#     def get_queryset(self):
#         hotel_id = self.kwargs.get('hotel_id')
#         queryset = Recomments.objects.filter(hotel_id=hotel_id)
#         return queryset
    
# class RecommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
   
#     queryset = Recomments.objects.all()
#     serializer_class = RecommentSerializer
#     permission_classes = [permissions.AllowAny]
    
# def upload_image(request):
#     if request.method == 'POST' and request.FILES.getlist('roomimage'):
#         images = request.FILES.getlist('roomimage')
#         # Xử lý và lưu trữ hình ảnh ở đây
#         # Trả về URL của các hình ảnh đã tải lên
#         image_urls = [handle_uploaded_image(image) for image in images]
#         return JsonResponse({'image_urls': image_urls})
#     return JsonResponse({'error': 'No image uploaded'})