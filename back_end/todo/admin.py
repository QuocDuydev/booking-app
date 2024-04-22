from django.contrib import admin
from .models import Users, Hotels, HotelImage

class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "name", "email", "password", "account_type", "joined")
    
class HotelImageInline(admin.TabularInline):
    model = HotelImage

class HotelAdmin(admin.ModelAdmin):
    inlines = [HotelImageInline]
    # list_display = ("hotel_id", "hotelname", "hotelimage", "descriptions",  "totalroom", "roommap", "location", "rating", "dateadded")

# class RoomAdmin(admin.ModelAdmin):
#     list_display = ("room_id", "hotel", "roomname", "roomimage", "descriptions", "roomprice", "roomnumber", "roomoccupancy", "room_type", "dateadded",)

# class BookingAdmin(admin.ModelAdmin):
#     list_display = ("booking_id","user","hotel","room", "name", "email", "phonenumber","address", "checkin", "checkout", "total", "datebooking", "status")
    
# class RecommentAdmin(admin.ModelAdmin):
#     list_display = ("comment_id","hotel", "user", "descriptions", "rating", "datecommented",)   
admin.site.register(Users, UserAdmin)
admin.site.register(Hotels, HotelAdmin)
admin.site.register(HotelImage)
# admin.site.register(Rooms, RoomAdmin)
# admin.site.register(Booking, BookingAdmin)
# admin.site.register(Recomments, RecommentAdmin)