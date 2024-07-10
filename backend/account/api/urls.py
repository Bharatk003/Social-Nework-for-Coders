from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from .views import (
    FollowUnfollowUserAPIView,
    MyTokenObtainPairView,
    UserDetailAPIView,
    SignupAPIView,
    ProfileUpdateAPIView,
    FollowingListAPIView,
    FollowerListAPIView
)


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("info/", UserDetailAPIView.as_view()),#This URL is for retrieving the details of the currently logged-in user
    path("<int:id>/info/", UserDetailAPIView.as_view()),#This URL is for retrieving the details of any user by their ID.
    path("signup/", SignupAPIView.as_view()),
    path("<int:id>/following/", FollowingListAPIView.as_view()),
    path("<int:id>/followers/", FollowerListAPIView.as_view()),
    path("profile/update/", ProfileUpdateAPIView.as_view()),
    path("follow_unfollow/<int:pk>/", FollowUnfollowUserAPIView.as_view()),
    path('api/token/blacklist/', TokenBlacklistView.as_view(),
         name='token_blacklist'),
]
