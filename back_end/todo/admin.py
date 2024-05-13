from django.contrib import admin
<<<<<<< HEAD
from .models import Users, AccommodationImage, Accommodations, RoomAmenities, AccommodationUtilities, Rooms, RoomImage, Booking, Recomments
=======
from .models import Users, AccommodationImage, Accommodations, RoomAmenities, Rooms, RoomImage
>>>>>>> parent of e715492 (Update page home add acc detail)

class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username" ,"images","name", "email", "password", "phone","address", "account_type", "sex_type", "createdAt", "updatedAt")
    
class AccommodationImageInline(admin.TabularInline):
    model = AccommodationImage
    
class AccommodationUtilitiesInline(admin.TabularInline):
    model = AccommodationUtilities
    
class AccommodationAdmin(admin.ModelAdmin):
    inlines = [AccommodationImageInline, AccommodationUtilitiesInline]
    
class RoomImageInline(admin.TabularInline):
    model = RoomImage

class RoomAmenitiesInline(admin.TabularInline):
    model = RoomAmenities


    
class RoomAdmin(admin.ModelAdmin):
    inlines = [RoomImageInline, RoomAmenitiesInline]
    
# class HotelAdmin(admin.ModelAdmin):
#     inlines = [HotelImageInline]
    # list_display = ("hotel_id", "hotelname", "hotelimage", "descriptions",  "totalroom", "roommap", "location", "rating", "dateadded")
# class AccommodationTypeAdmin(admin.ModelAdmin):
#     list_display = ("id", "username", "name", "email", "password", "account_type", "joined")
# class RoomAdmin(admin.ModelAdmin):
#     list_display = ("room_id", "hotel", "roomname", "roomimage", "descriptions", "roomprice", "roomnumber", "roomoccupancy", "room_type", "dateadded",)

# class BookingAdmin(admin.ModelAdmin):
#     list_display = ("booking_id","user","hotel","room", "name", "email", "phonenumber","address", "checkin", "checkout", "total", "datebooking", "status")
    
# class RecommentAdmin(admin.ModelAdmin):
#     list_display = ("comment_id","hotel", "user", "descriptions", "rating", "datecommented",)   
admin.site.register(Users, UserAdmin)
admin.site.register(Accommodations, AccommodationAdmin)
admin.site.register(AccommodationImage)
admin.site.register(Rooms, RoomAdmin)
admin.site.register(RoomImage)

# admin.site.register(Accommodation_type)
# admin.site.register(Rooms, RoomAdmin)
# admin.site.register(Booking, BookingAdmin)
# admin.site.register(Recomments, RecommentAdmin)