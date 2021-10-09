from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=25)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=25, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    color = models.CharField(max_length=7)

    def get_week(self):
        return self.start_time.isocalendar()[1]

    def get_day(self):
        return self.start_time.weekday()

    def get_year(self):
        return self.start_time.year

    def __lt__(self, other):
        return (self.start_time - other.start_time).total_seconds()

    def __str__(self):
        return "%s\n%02d:%02d - %02d:%02d\n%s" % (
            self.title, self.start_time.hour + 2, self.start_time.minute,
            self.end_time.hour + 2, self.end_time.minute, self.description
        )
