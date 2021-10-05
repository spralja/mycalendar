from django.contrib import admin

from .models import *

models = [
    Event
]

[admin.site.register(model) for model in models]
