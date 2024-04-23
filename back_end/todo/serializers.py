
from django.conf import Settings
from rest_framework import serializers
from .models import Users, Hotels, HotelImage
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
        

class HotelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelImage
        fields = '__all__'

class MultipleImageSerializer(serializers.Serializer):
    images = serializers.ListField(
        child=serializers.ImageField()
    )
class HotelSerializer(serializers.ModelSerializer):
    images = HotelImageSerializer(many=True, read_only=True)

    class Meta:
        model = Hotels
        fields = '__all__'

# class HotelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Hotels
#         fields = '__all__' 

# class RoomSerializer(serializers.ModelSerializer):
   
#     class Meta:
#         model = Rooms
#         fields = '__all__'

    
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
        

