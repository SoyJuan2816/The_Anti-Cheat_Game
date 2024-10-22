from django.urls import path
from . import views

urlpatterns = [
    path('The_Anti-Cheat_Game/', views.splash, name='splash'),
    path('The_Anti-Cheat_Game/home/', views.menu, name='menu'),
    path('The_Anti-Cheat_Game/select_mode/', views.mode, name='select_mode'),
    path('The_Anti-Cheat_Game/marathon/', views.marathon_mode, name='marathon_mode'),
    path('The_Anti-Cheat_Game/learn/', views.marathon_learn, name='learn_mode'),
]
