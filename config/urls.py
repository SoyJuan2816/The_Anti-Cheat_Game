from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('splash.html')),  # Ruta principal hacia la app del juego
]
