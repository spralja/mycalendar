from django.db import models
from django.utils.translation import gettext_lazy as _


class DayOfTheWeek(models.Model):
    class Name(models.TextChoices):
        MONDAY = 'Monday', _('Monday')
        TUESDAY = 'Tuesday', _('Tuesday')
        WEDNESDAY = 'Wednesday', _('Wednesday')
        THURSDAY = 'Thursday', _('Thursday')
        FRIDAY = 'Friday', _('Friday')
        SATURDAY = 'Saturday', _('Saturday')
        SUNDAY = 'Sunday', _('Sunday')

    name = models.CharField(choices=Name.choices, max_length=9)

    def __str__(self):
        return self.name

