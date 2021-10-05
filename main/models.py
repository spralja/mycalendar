from django.db import models


class Day(models.Model):
    time = models.DateField()

    def __get_day_ordinal_suffix(self):
        day = self.time.day
        if 4 <= day <= 20 or 24 <= day <= 30:
            return 'th'
        else:
            return ['st', 'nd', 'rd'][day % 10 - 1]

    def __str__(self):
        format_string = "%A, %#d" + self.__get_day_ordinal_suffix() + " %B, %Y"
        return self.time.strftime(format_string)
