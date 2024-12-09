from django.urls import path
from . import views

urlpatterns = [
    path('The_Anti-Cheat_Game/', views.splash, name='splash'),
    path('The_Anti-Cheat_Game/home/', views.menu, name='menu'),
    path('The_Anti-Cheat_Game/select_mode/', views.mode, name='select_mode'),
    path('The_Anti-Cheat_Game/marathon/', views.marathon_mode, name='marathon_mode'),
    path('The_Anti-Cheat_Game/about/', views.about, name='about'),
    path('The_Anti-Cheat_Game/learn/<int:pdf_index>/', views.learn_view, name="learn"),
    path('The_Anti-Cheat_Game/select-comodines/', views.target_view, name="select_comodines"),
    path('The_Anti-Cheat_Game/tablero/', views.tablero, name="tablero"),
]
