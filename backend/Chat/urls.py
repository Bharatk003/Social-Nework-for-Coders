# urls.py (inside the chat app)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatMessageViewSet, UserViewSet

router = DefaultRouter()
router.register(r'chat', ChatMessageViewSet, basename='chatmessage')  # Specify the basename
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
