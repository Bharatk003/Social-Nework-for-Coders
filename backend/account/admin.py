from django.contrib import admin
from .models import User
from Chat.models import ChatMessage
# Register your models here.


class ChatMessageAdmin(admin.ModelAdmin):
    list_editable = ['is_read']
    list_display = ['sender', 'receiver', 'message' , 'is_read']

admin.site.register(User)
admin.site.register(ChatMessage, ChatMessageAdmin)