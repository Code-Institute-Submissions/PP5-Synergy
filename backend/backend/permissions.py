from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class IsWorkstreamOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.workstream.owner == request.user


class IsStaffOrReadOnly(permissions.BasePermission):
    print('start')
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        print(request.user.user_participant.get(workstream=request.user.profile.default_workstream).is_staff)
        return request.user.user_participant.get(workstream=request.user.profile.default_workstream).is_staff