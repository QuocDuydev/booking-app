from argparse import Action
from django.shortcuts import get_object_or_404, render
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
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework import generics
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from .serializers import UserSerializer,  HotelSerializer, UserSignupSerializers, HotelImageSerializer, MultipleImageSerializer
from .models import Users, Hotels, HotelImage
from django.http import JsonResponse

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

# class RoomView(viewsets.ModelViewSet):
#     permission_classes = [permissions.AllowAny]
#     serializer_class = RoomSerializer
#     queryset = Rooms.objects.all()

# class RoomRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):   
#    queryset = Rooms.objects.all()
#    serializer_class = RoomSerializer
#    permission_classes = [permissions.AllowAny]

@api_view(['GET'])
def hotel_images(request, pk):
    hotel = get_object_or_404(Hotels, pk=pk)
    images = hotel.images.all()
    serializer = HotelImageSerializer(images, many=True)
    return Response(serializer.data)

class HotelImageView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = HotelImage.objects.all()
    serializer_class = HotelImageSerializer
    
    def multiple_upload(self, request, *args, **kwargs):
        serializer = MultipleImageSerializer(data=request.data or None)
        serializer.is_valid(raise_exception=True)
        images = serializer.validated_data.get("images")
        images_list = []
        for image in images:
            hotel_image = HotelImage.objects.create(image=image)
            images_list.append(hotel_image.image.url) # Lưu URL của ảnh
        return Response(images_list)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response("Success")

class HotelImageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HotelImage.objects.all()
    serializer_class = HotelImageSerializer

class HotelView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = HotelSerializer
    queryset = Hotels.objects.all()

class HotelRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
   
    queryset = Hotels.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [permissions.AllowAny]

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


# class HotelRoomsListView(APIView):
#     permission_classes = [permissions.AllowAny]
#     def get(self, request, hotel_id, format=None):
#         rooms = Rooms.objects.filter(hotel_id=hotel_id)
#         serializer = RoomSerializer(rooms, many=True, context={'request': request})
#         return Response(serializer.data)
    
# class RoomstoHotelListView(APIView):
#     permission_classes = [permissions.AllowAny]
#     def get(self, request, hotel_id,room_id, format=None):
#         rooms = Rooms.objects.filter(hotel_id=hotel_id, room_id=room_id)
#         serializer = RoomSerializer(rooms, many=True, context={'request': request})
#         return Response(serializer.data)
    
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