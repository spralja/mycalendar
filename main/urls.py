from django.urls import path

from . import views

app_name = 'main'
urlpatterns = [
    path('', views.current, name='current'),
    path('y/<int:year>/w/<int:week>/', views.index, name='index'),
    path('y/<int:year>/w/<int:week>/event/<int:pk>/', views.event, name='event'),
]
