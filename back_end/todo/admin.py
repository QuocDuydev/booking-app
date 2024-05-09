from django.contrib import admin
from .models import Users, AccommodationImage, Accommodations, RoomAmenities, Rooms, RoomImage, Booking, Recomments

class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username" ,"images","name", "email", "password", "phone","address", "account_type", "sex_type", "createdAt", "updatedAt")
    
class AccommodationImageInline(admin.TabularInline):
    model = AccommodationImage

class AccommodationAdmin(admin.ModelAdmin):
    inlines = [AccommodationImageInline]
    
class RoomImageInline(admin.TabularInline):
    model = RoomImage

class RoomAmenitiesInline(admin.TabularInline):
    model = RoomAmenities
    
class RoomAdmin(admin.ModelAdmin):
    inlines = [RoomImageInline, RoomAmenitiesInline]

class BookingAdmin(admin.ModelAdmin):
    list_display = ("booking_id","user","accommodations","rooms", "name", "email", "phonenumber","address", "checkin", "checkout", "total", "createdAt", "updatedAt", "status")
    
class RecommentAdmin(admin.ModelAdmin):
    list_display = ("comment_id","accommodations", "user", "descriptions", "rating", "createdAt", "updatedAt")
       
admin.site.register(Users, UserAdmin)

admin.site.register(Accommodations, AccommodationAdmin)
admin.site.register(AccommodationImage)

admin.site.register(Rooms, RoomAdmin)
admin.site.register(RoomImage)

admin.site.register(Booking, BookingAdmin)
admin.site.register(Recomments, RecommentAdmin)