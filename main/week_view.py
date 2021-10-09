from datetime import datetime, timedelta


class WeekView:
    DAYS_IN_WEEK = 7
    HOURS_IN_DAY = 24
    day_s = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday',
    }

    class Div:
        def __init__(self, left, top, width, height,
                     text="",
                     background_color="#FFFFFF",
                     border_color="#000000",
                     border_style="solid",
                     border_width="medium",
                     ):
            self.left = left
            self.top = top
            self.width = width
            self.height = height
            self.text = text
            self.background_color = background_color
            self.border_color = border_color
            self.border_style = border_style
            self.border_width = border_width
            self.style = {
                'left': self.add_px(left),
                'top': self.add_px(top),
                'width': self.add_px(width),
                'height': self.add_px(height),
                'background-color': self.background_color,
                'border-color': self.border_color,
                'border-style': self.border_style,
                'border-width': self.border_width,
            }

        @staticmethod
        def add_px(value):
            return "%dpx" % value

        def get_style(self):
            style = ""
            for key, value in self.style.items():
                style += "%s:%s; " % (key, value)

            return style

        def __str__(self):
            return self.text

    def __init__(self, year, week, events):
        self.year = year
        self.week = week
        self.divs = []
        next_ = {
            'year': (datetime.fromisocalendar(day=1, week=week, year=year) + timedelta(days=7)).year,
            'week': (datetime.fromisocalendar(day=1, week=week, year=year) + timedelta(days=7)).isocalendar()[1],
        }

        prev = {
            'year': (datetime.fromisocalendar(day=1, week=week, year=year) - timedelta(days=7)).year,
            'week': (datetime.fromisocalendar(day=1, week=week, year=year) - timedelta(days=7)).isocalendar()[1],
        }
        self.divs.append(WeekView.Div(
            0,
            0,
            150,
            35,
            'week %d <a href="/y/%d/w/%d/">prev</a> <a href="/y/%d/w/%d/">next</a>' % (
                self.week,
                prev['year'],
                prev['week'],
                next_['year'],
                next_['week'],
            )
        ))
        for i in range(WeekView.DAYS_IN_WEEK):
            self.divs.append(WeekView.Div(150 * (i + 1), 0, 150, 35, WeekView.day_s[i]))

        for i in range(WeekView.HOURS_IN_DAY):
            self.divs.append(WeekView.Div(
                0, 35 * (i + 1), 150, 35, "%02d:00" % i
            ))

        for i in range(WeekView.DAYS_IN_WEEK):
            for j in range(WeekView.HOURS_IN_DAY):
                self.divs.append(WeekView.Div(
                    150 * (i + 1), 35 * (j + 1), 150, 35,
                    border_color="#555555", border_style="dashed",
                    border_width="thin"
                ))

        for event in events:
            self.divs.append(WeekView.Div(
                150 * (event.start_time.weekday() + 1),
                35 * (event.start_time.hour + 3) + int(event.start_time.minute * 35 / 60),
                150,
                int((event.end_time - event.start_time).total_seconds() / 3600 * 35),
                background_color=event.color,
                text=event.__str__()
            ))
