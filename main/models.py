from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=25)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=25, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def get_week(self):
        return self.start_time.isocalendar()[1]

    def get_day(self):
        string = self.start_time.strftime("%A")
        switch = {
           'Monday': 1,
           'Tuesday': 2,
           'Wednesday': 3,
           'Thursday': 4,
           'Friday': 5,
           'Saturday': 6,
           'Sunday': 7,
        }

        return switch[string]
