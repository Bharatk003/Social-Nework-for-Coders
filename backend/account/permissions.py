# In accounts/permissions.py

from rest_framework.permissions import BasePermission

class IsPublicOrFollowing(BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.is_private:
            return request.user in obj.followers.all()
        return True
