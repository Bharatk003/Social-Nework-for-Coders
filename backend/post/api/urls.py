from django.urls import path
from .views import (
    PostListAPIView, UserPostListAPIView, PostCreateAPIView, PostUpdateAPIView, 
    PostRetrieveAPIView, PostDeleteAPIView, PostCommentsListAPIView, 
    CommentsListAPIView, CommentCreateApiView, CommentDestroyApiView, 
    CommentUpdateApiView, CommentRetrieveAPIView, LikeUnlikePostAPIView, 
    SaveUnsavePostAPIView, ReplyListAPIView, ReplyCreateApiView, ReplyUpdateApiView, 
    ReplyDestroyApiView, ReplyRetrieveAPIView, TagListCreateAPIView
)

urlpatterns = [
    path('posts/', PostListAPIView.as_view(), name='post-list'),
    path('posts/user/<int:id>/', UserPostListAPIView.as_view(), name='user-post-list'),
    path('posts/create/', PostCreateAPIView.as_view(), name='post-create'),
    path('posts/<int:pk>/', PostRetrieveAPIView.as_view(), name='post-retrieve'),
    path('posts/<int:pk>/update/', PostUpdateAPIView.as_view(), name='post-update'),
    path('posts/<int:pk>/delete/', PostDeleteAPIView.as_view(), name='post-delete'),
    path('posts/<int:pk>/comments/', PostCommentsListAPIView.as_view(), name='post-comments-list'),
    path('comments/', CommentsListAPIView.as_view(), name='comments-list'),
    path('comments/<int:pk>/create/', CommentCreateApiView.as_view(), name='comment-create'),
    path('comments/<int:pk>/', CommentRetrieveAPIView.as_view(), name='comment-retrieve'),
    path('comments/<int:pk>/update/', CommentUpdateApiView.as_view(), name='comment-update'),
    path('comments/<int:pk>/delete/', CommentDestroyApiView.as_view(), name='comment-delete'),
    path('posts/<int:pk>/like/', LikeUnlikePostAPIView.as_view(), name='like-unlike-post'),
    path('posts/<int:pk>/save/', SaveUnsavePostAPIView.as_view(), name='save-unsave-post'),
    path('comments/<int:comment_id>/replies/', ReplyListAPIView.as_view(), name='reply-list'),
    path('comments/<int:comment_id>/replies/create/', ReplyCreateApiView.as_view(), name='reply-create'),
    path('replies/<int:pk>/', ReplyRetrieveAPIView.as_view(), name='reply-retrieve'),
    path('replies/<int:pk>/update/', ReplyUpdateApiView.as_view(), name='reply-update'),
    path('replies/<int:pk>/delete/', ReplyDestroyApiView.as_view(), name='reply-delete'),
    path('tags/', TagListCreateAPIView.as_view(), name='tag-list-create'),
]
