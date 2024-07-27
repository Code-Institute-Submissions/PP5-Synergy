from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include(
        'dj_rest_auth.registration.urls'
        )),
    path('api/', include('profiles.urls')),
    path('api/', include('workstream.urls')),
    path('api/', include('category.urls')),
    path('api/', include('task.urls')),
    path('api/', include('project.urls')),
    path('api/', include('invite.urls')),
]