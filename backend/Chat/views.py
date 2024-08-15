from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import ChatMessage, User
from .serializers import ChatMessageSerializer, UserSerializer

# views.py
class ChatMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Set the queryset attribute
    queryset = ChatMessage.objects.all()

    def get_queryset(self):
        user = self.request.user
        return ChatMessage.objects.filter(sender=user) | ChatMessage.objects.filter(receiver=user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
