from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
import hashlib
import time
from django.utils.translation import gettext as _


def profile_path(user, filename: str) -> str:
    """
    Return a unique path for all user images
    """
    extension = filename.split(".").pop()
    directory_name = f"{user.username}_{user.id}"
    hash = hashlib.md5(str(time.time()).encode()).hexdigest()
    return f"images/profile/{directory_name}/{hash}.{extension}"


def cover_image_path(user, filename: str):
    extension = filename.split(".").pop()
    directory_name = f"{user.username}_{user.id}"
    hash = hashlib.md5(str(time.time()).encode()).hexdigest()
    return f"images/profile/cover/{directory_name}/{hash}.{extension}"


class User(AbstractUser):
    
    profile_pic = models.ImageField(upload_to=profile_path, null=True)
    following = models.ManyToManyField('self')
    is_private = models.BooleanField(default=False)
    cover_pic = models.ImageField(upload_to=cover_image_path, null=True, default="images/cover/coverphoto.jpg")
    followers = models.ManyToManyField('self')
    bio = models.TextField(blank=True)
    gender = models.CharField(max_length=100, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
        ('prefer_not_to_say', 'Prefer not to say')
    ], blank=True)
    
    pronouns = models.CharField(max_length=50, blank=True)
    github_link = models.URLField(max_length=200, blank=True)
    linkedin_link = models.URLField(max_length=200, blank=True)
    other_link = models.URLField(max_length=200, blank=True)
    skills = models.TextField(blank=True, help_text="Comma-separated list of skills")
    
    
    def __str__(self):
        return self.username
    
    def media_posts(self):
        return self.posts.exclude(image='')
    
    
# In accounts/models.py

class FollowRequest(models.Model):
    from_user = models.ForeignKey(User, related_name="sent_follow_requests", on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name="received_follow_requests", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'to_user')
