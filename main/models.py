from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from datetime import datetime, timedelta


class Time:
    def __init__(self, date_time):
        self.quarter = int(date_time.minute / 15 + 4*date_time.hour)
        self.day = date_time.weekday()
        self.week = date_time.isocalendar()[1] - 1
        self.year = date_time.year


class Quarter:
    def __init__(self, time, color):
        self.x = time.day
        self.y = time.quarter
        self.color = color


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
        string = self.start_time.strftime("%A")
        return self.switch[string]

    def get_times(self):
        times = []
        time = self.start_time + timedelta(minutes=15)
        while time <= self.end_time:
            times.append(Time(time))
            time = time + timedelta(minutes=15)

        return times

    def __lt__(self, other):
        return (self.start_time - other.start_time).total_seconds()

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
