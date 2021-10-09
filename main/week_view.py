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
        def __init__(self, left, top, width, height, text="",
                     background_color="#FFFFFF", ):
            self.left = left
            self.top = top
            self.width = width
            self.height = height
            self.text = text
            self.background_color = background_color
            self.style = {
                'left': self.left_s(),
                'top': self.top_s(),
                'width': self.width_s(),
                'height': self.height_s(),
                'background-color': self.background_color,
            }

        def left_s(self):
            return "%dpx" % self.left

        def top_s(self):
            return "%dpx" % self.top

        def width_s(self):
            return "%dpx" % self.width

        def height_s(self):
            return "%dpx" % self.height

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
        self.divs.append(WeekView.Div(0, 0, 150, 35, "week %d" % self.week))
        for i in range(WeekView.DAYS_IN_WEEK):
            self.divs.append(WeekView.Div(150*(i + 1), 0, 150, 35, WeekView.day_s[i]))

        for i in range(WeekView.HOURS_IN_DAY):
            self.divs.append(WeekView.Div(
                0, 35*(i + 1), 150, 35, "%02d:00" % i
            ))

        for i in range(WeekView.DAYS_IN_WEEK):
            for j in range(WeekView.HOURS_IN_DAY):
                self.divs.append(WeekView.Div(
                    150*(i + 1), 35*(j + 1), 150, 35
                ))

        for event in events:
            self.divs.append(WeekView.Div(
                150*(event.start_time.weekday() + 1),
                35*(event.start_time.hour + 3) + int(event.start_time.minute*35/60),
                150,
                int((event.end_time - event.start_time).total_seconds()/3600*35),
                background_color=event.color,
                text=event.__str__()
            ))
