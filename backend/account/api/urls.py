from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from .views import (
    FollowUnfollowUserAPIView,
    MyTokenObtainPairView,
    UserDetailAPIView,
    SignupAPIView,
    ProfileUpdateAPIView,
    FollowingListAPIView,
    FollowerListAPIView,
    FollowRequestListAPIView,
    AcceptFollowRequestAPIView,
    DeclineFollowRequestAPIView,
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
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('follow-requests/', FollowRequestListAPIView.as_view(), name='follow_request_list'),
    path('follow-requests/<int:pk>/accept/', AcceptFollowRequestAPIView.as_view(), name='accept_follow_request'),
    path('follow-requests/<int:pk>/decline/', DeclineFollowRequestAPIView.as_view(), name='decline_follow_request'),
]
