class Cell:
    width = 150

    def __init__(self, pos_y, height, background_color="#FFFFFF"):
        self.pos_y = pos_y
        self.height = height
        self.background_color = background_color

class Calendar:
    def __init__(self):
        self.table = [
            [Cell(0, 480), Cell(480, 0)],
            [Cell(0, 480), Cell(480, 0)],
            [Cell(0, 480), Cell(480, 0)],
            [Cell(0, 480), Cell(480, 0)],
            [Cell(0, 480), Cell(480, 0)],
            [Cell(0, 480), Cell(480, 0)],
            [Cell(0, 480), Cell(480, 0)],
        ]

    def add_event(self, event):
        x = event.start_time.weekday()
        pos_y = event.start_time.hour*20 + int(event.start_time.minute / 3)
        duration = event.end_time - event.start_time
        height = duration.hour*20 + int(duration.minute / 3)
        event_cell = Cell(pos_y, height, event.color)
        for y in range(len(self.table[x])):
            current_cell = self.table[x][y]
            if current_cell.pos_y > pos_y:
                former_cell = self.table[x][y - 1]
                latter_cell = self.table[x][y]
                former_cell.height = pos_y - former_cell.pos_y
                filler_cell = Cell(pos_y + height, latter_cell.pos_y - (pos_y + height))
                self.table[x].insert(y + 1, filler_cell)
                self.table[x].insert(y + 1, event_cell)

