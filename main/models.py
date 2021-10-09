from django.db import models


class Event(models.Model):
    switch = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7,
    }
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
            self.title, self.start_time.hour, self.start_time.minute,
            self.end_time.hour, self.end_time.minute, self.description
        )

    def get_time_frame(self):
        return "%02d:%02d - %02d:%02d" % (
            self.start_time.hour, self.start_time.minute,
            self.end_time.hour, self.start_time.minute
        )

    def get_left(self):
        return "%dpx;" % (150*self.start_time.weekday())

    def get_top(self):
        return "%dpx;" % (self.start_time.hour*20 + int(self.start_time.minute/3))

    def get_height(self):
        return "%dpx;" % int((self.end_time - self.start_time).total_seconds()/90)

    def get_style(self):
        return "position:absolute; width:150px; left:" + self.get_left() + " top:" \
            + self.get_top() + " height:" + self.get_height() \
            + "background-color:" + self.color + ";"


class Day:
    width = 150
    switch = {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday",
    }

    def __init__(self, index):
        self.name = self.switch[index]
        self.left = index*self.width

    def get_left(self):
        return "%dpx;" % self.left

    def get_style(self):
        return "position:absolute; width:150px; left:" + self.get_left() + "top:0px;"

    def __str__(self):
        return self.name
