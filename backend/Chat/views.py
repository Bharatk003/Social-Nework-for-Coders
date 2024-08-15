from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import ChatMessage, User
from .serializers import ChatMessageSerializer, UserSerializer

from rest_framework.permissions import IsAuthenticated
 
 

class ChatMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ChatMessage.objects.filter(sender=user) | ChatMessage.objects.filter(receiver=user)

    def perform_create(self, serializer):
        # Ensure that the receiver is passed and saved correctly
        receiver_id = self.request.data.get('receiver')
        receiver = User.objects.get(id=receiver_id)
        serializer.save(sender=self.request.user, receiver=receiver)



class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
