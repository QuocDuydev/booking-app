from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


class AppUserManager(BaseUserManager):
    def create_user(self, username,email, password=None):
        if not email:
            raise ValueError('Vui long dien email')
        if not password:
            raise ValueError('Vui long dien password')
        username = self.normalize_email(username)
        user = self.model(username=username)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self,email, password):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
class Users(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length = 100, unique=True)
    name = models.CharField(max_length = 100, default = "")
    email = models.CharField(max_length = 200)
    password = models.CharField(max_length = 100)
    joined = models.DateField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = 'username'
    ACCOUNT_TYPES = [
        ('user', 'Người dùng'),
        ('admin', 'Quản trị viên'),
        ('superadmin', 'Quản trị viên cấp cao'),
    ]
    account_type = models.CharField(
        max_length=10,
        choices=ACCOUNT_TYPES,
        default='user',  # Giá trị mặc định có thể là 'user' hoặc 'admin'
    )
    objects = AppUserManager()
    def __str__(self):
        return self.username

class Hotels(models.Model):
    hotel_id = models.AutoField(primary_key=True)
    hotelname = models.CharField(max_length=100)
    descriptions = models.TextField()
    totalroom = models.IntegerField()
    roommap = models.CharField(max_length=200)
    location = models.CharField(max_length=300)
    rating = models.IntegerField()
    dateadded = models.DateField()

    def __str__(self):
        return self.hotelname

class HotelImage(models.Model):
    hotel = models.ForeignKey(Hotels, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='hotel-images')

    def __str__(self):
        return f"Image for {self.hotel.hotelname}"
    
# class Rooms(models.Model):
#     room_id = models.AutoField(primary_key=True)
#     hotel = models.ForeignKey(Hotels, on_delete=models.CASCADE)
#     roomname = models.CharField(max_length = 100)
#     roomimage = models.ImageField(upload_to='room_images/')
#     descriptions = models.TextField()
#     roomprice = models.IntegerField()
#     roomnumber = models.IntegerField()
#     roomoccupancy = models.IntegerField()
#     dateadded = models.DateField()
#     ROOM_TYPES = [
#         ('simple_room', 'Simple Room'),
#         ('double_room', 'Double Room'), 
#         ('family_room', 'Family Room'), 
#     ]
#     room_type = models.CharField(
#         max_length=20,
#         choices=ROOM_TYPES,
#     )
#     def __str__(self):
#         return f"{self.roomname}"

# class RoomImage(models.Model):
#     room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='room_images/')

#     def __str__(self):
#         return f"Image for {self.room.roomname}"
    
# class Booking(models.Model):
#     booking_id = models.AutoField(primary_key=True)
#     user = models.ForeignKey(Users, on_delete=models.CASCADE)
#     hotel = models.ForeignKey(Hotels, on_delete=models.CASCADE)
#     room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
#     name = models.CharField(max_length = 100)
#     email = models.CharField(max_length = 200)
#     phonenumber = models.IntegerField()
#     address = models.CharField()
#     checkin = models.DateField()
#     checkout = models.DateField()
#     total = models.IntegerField()
#     datebooking = models.DateField()
#     STATUS_TYPES = [
#         ('active', 'Active'),
#         ('processing', 'Processing'), 
#         ('hide', 'Hide'), 
#     ]
#     status = models.CharField(
#         max_length=10,
#         choices=STATUS_TYPES,
#         default='processing',  # Giá trị mặc định có thể là 'active' hoặc 'processing'
#     )
#     def __str__(self):
#         return f"{self.booking_id},{self.user}, {self.hotel}, {self.room}, {self.name}, {self.email},{self.phonenumber}, {self.address}, {self.checkin}, {self.checkout},  {self.total}, {self.datebooking}, {self.status}"   

# class Recomments(models.Model):
#     comment_id = models.AutoField(primary_key=True)
#     hotel = models.ForeignKey(Hotels, on_delete=models.CASCADE)
#     user = models.ForeignKey(Users, on_delete=models.CASCADE)
#     descriptions = models.TextField()
#     rating = models.IntegerField()
#     datecommented = models.DateField()
    
#     def __str__(self):
#         return f"{self.user}"