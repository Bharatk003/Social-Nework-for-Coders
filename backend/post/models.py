from django.db import models
import hashlib
import time
from django.conf import settings
from .managers import PostManager

User : str = settings.AUTH_USER_MODEL
# Create your models here.
def profile_path(instance, filename: str) -> str:
    """
    Return a unique path for all user images
    """
    extension = filename.split(".").pop()
    directory_name = f"{instance.creator.username}_{instance.creator.id}"
    hash = hashlib.md5(str(time.time()).encode()).hexdigest()
    return f"images/posts/images/{directory_name}/{hash}.{extension}"


class Comment(models.Model):
    creator = models.ForeignKey(
        User, related_name="comments", on_delete=models.CASCADE)
    content = models.TextField()
    post = models.ForeignKey(
        "Post", related_name='comments', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

class Reply(models.Model):
    creator = models.ForeignKey(User, related_name="replies", on_delete=models.CASCADE)
    content = models.TextField()
    comment = models.ForeignKey(Comment, related_name='replies', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to=profile_path, default="", null=True, blank=True)
    video = models.FileField(upload_to=profile_path, default="", null=True, blank=True)
    creator = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    content = models.TextField()  # For plain text content
    markdown_content = models.TextField(blank=True, null=True)  # For markdown content
    code_snippet = models.TextField(blank=True, null=True)  # For code snippets with syntax highlighting
    likes = models.ManyToManyField(User, related_name='liked_post')
    saves = models.ManyToManyField(User, related_name="saved_post")
    isEdited = models.BooleanField(default=False)
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)  # Many-to-Many relationship with Tag model
    objects = PostManager()
    
    def __str__(self):
        return f'{self.creator.username} at {self.created}'
    
