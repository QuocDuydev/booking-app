
from django.conf import Settings
from rest_framework import serializers
from .models import Users, AccommodationImage, Accommodation_type, Accommodations, Rooms, RoomImage, Room_type, RoomAmenities, Amenities
from django.contrib.auth import get_user_model

UserModel = get_user_model()
class UserSignupSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
    def validate(self, data):
        if Users.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "Email đã tồn tại"})
        if Users.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "Tên người dùng đã tồn tại"})
        return data
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(email=clean_data['email'],username=clean_data['username'], password=clean_data['password'])
        user_obj.email = clean_data['email']
        user_obj.save()
        return user_obj 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        
class AmenitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenities
        fields = '__all__'     
          
# Accommodation
class AccommodationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccommodationImage
        fields = '__all__'

class AccommodationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accommodation_type
        fields = '__all__'

class AccommodationSerializer(serializers.ModelSerializer):
    images = AccommodationImageSerializer(many=True, read_only=True)

    class Meta:
        model = Accommodations
        fields = '__all__'
        
# Room
class RoomImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomImage
        fields = '__all__'

class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_type
        fields = '__all__'
        
class RoomAmenitiesSerializer(serializers.ModelSerializer):
    # amenities_info = serializers.PrimaryKeyRelatedField(
    #     many=True,
    #     queryset=Amenities.objects.all(), 
    # )
    class Meta:
        model = RoomAmenities
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    images = RoomImageSerializer(many=True, read_only=True)
    amenities = RoomAmenitiesSerializer(many=True, read_only=True)
    
    class Meta:
        model = Rooms
        fields = '__all__'
    
# class BookingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Booking
#         fields = '__all__'
#         user_id = serializers.PrimaryKeyRelatedField(read_only=True)

# class RecommentSerializer(serializers.ModelSerializer):
   
#     class Meta:
#         model = Recomments
#         fields = '__all__'
#         user_id = serializers.PrimaryKeyRelatedField(read_only=True)
        

