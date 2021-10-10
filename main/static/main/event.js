console.log("test");

class Event {
    static #idToEventDict = {}
    static addEventListeners(window, events) {
        window.addEventListener('mousedown', function(e) {
            for(let i = 0; i < events.length; ++i) {
                if(events[i].isInside(e.pageX, e.pageY)) {
                    events[i].isBeingDraggedState = true;
                }
            }
        });

        window.addEventListener('mouseup', function(e) {
            for(let i = 0; i < events.length; ++i) {
                events[i].isBeingDraggedState = false;
            }
        });

        window.addEventListener('mousemove', function(e) {
            for(let i = 0; i < events.length; ++i) {
                let event = events[i];
                if(event.isBeingDragged()) {
                    event.setX(e.pageX - event.lastMousePressEventMouseRelativeX);
                    event.setY(e.pageY - event.lastMousePressEventMouseRelativeY);
                }
            }
        })
    }

    static fromId(id) {
        return Event.#idToEventDict[id];
    }

    #event;
    #window;

    #lastMousePressEventMouseRelativeX;
    #lastMousePressEventMouseRelativeY;

    constructor(event, window) {
        let this_ = this;
        this.isBeingDraggedState = false;
        this.#event = event;

        this.#window = window;
        Event.#idToEventDict[this.getId()] = this;
        this.#event.addEventListener('mousedown', function(e) {
            let event = Event.fromId(e.target.id);
            event.#lastMousePressEventMouseRelativeX = e.pageX - event.getX();
            event.#lastMousePressEventMouseRelativeY = e.pageY - event.getY();
        });

        window.addEventListener('mousedown', function(e) {
            if(this_.isInside(e.pageX, e.pageY)) {
                this_.isBeingDraggedState = true;
            }
        });

        window.addEventListener('mouseup', function(e) {
            if(this_.isBeingDraggedState) {
                let relativeToColumn = this_.getX() % COLUMN_WIDTH;
                if(relativeToColumn*2 > COLUMN_WIDTH) relativeToColumn -= COLUMN_WIDTH;
                let relativeToHour = this_.getY() % HOUR_HEIGHT;
                if(relativeToHour*2 > HOUR_HEIGHT) relativeToHour -= HOUR_HEIGHT;
                let x = this_.getX() - relativeToColumn;
                let y = this_.getY() - relativeToHour
                this_.setX(x);
                this_.setY(y);

                {
                   let xhr = new XMLHttpRequest();
                    xhr.open('PUT', '', true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                         console.log("success");
                        } else console.log("failure");
                    };
                    let newStartDay = Math.floor((x - WEEK_VIEW_X1) / COLUMN_WIDTH - 1).toString();
                    let newStartHour = Math.floor((y - WEEK_VIEW_Y1) / HOUR_HEIGHT - 1).toString();
                    let newEndDay = Math.floor((x + this_.getWidth() - WEEK_VIEW_X1) / COLUMN_WIDTH - 1).toString();
                    let newEndHour = Math.floor((y + this_.getHeight() - WEEK_VIEW_Y1) / HOUR_HEIGHT - 1).toString();
                    console.log(newStartDay);
                    let data = {
                        "pk":this_.getPk(),
                        "new_start_day":newStartDay,
                        "new_start_hour":newStartHour,
                        "new_end_day":newEndDay,
                        "new_end_hour":newEndHour,
                    }
                    data = JSON.stringify(data);

                    xhr.send(data);}

                this_.update();
            }

            this_.isBeingDraggedState = false;
        });

        window.addEventListener('mousemove', function(e) {
           if(this_.isBeingDragged()) {
               let x = e.pageX - this_.#lastMousePressEventMouseRelativeX;
               let y = e.pageY - this_.#lastMousePressEventMouseRelativeY;
               if(x < WEEK_VIEW_X1 + COLUMN_WIDTH) x = WEEK_VIEW_X1 + COLUMN_WIDTH;
               if(y < WEEK_VIEW_Y1 + HOUR_HEIGHT) y = WEEK_VIEW_Y1 + HOUR_HEIGHT;
               if(x + this_.getWidth() > WEEK_VIEW_X2) x = WEEK_VIEW_X2 - this_.getWidth();
               if(y + this_.getHeight() > WEEK_VIEW_Y2) y = WEEK_VIEW_Y2 - this_.getHeight();

               this_.setX(x);
               this_.setY(y);
                this_.update();

                        }
                        })
    }

    isBeingDragged() {
        return this.isBeingDraggedState;
    }

    isInside(x, y) {
        return (
            x >= this.getX() &&
            x <= (this.getX() + this.getWidth()) &&
            y >= this.getY() &&
            y <= (this.getY() + this.getHeight())
        );
    }

    getId() {
        return this.#event.id;
    }

    getX() {
        return parseInt(this.#event.style.left.replace('px', ''));
    }

    getY() {
        return parseInt(this.#event.style.top.replace('px', ''));
    }

    getWidth() {
        return parseInt(this.#event.style.width.replace('px', ''));
    }

    getHeight() {
        return parseInt(this.#event.style.height.replace('px', ''));
    }

    setX(x) {
        this.#event.style.left = `${x}px`;
    }

    setY(y) {
        this.#event.style.top = `${y}px`
    }

    getPk() {
        return this.getId().replace('event', '');
    }

    update() {
        this.#event.innerHTML = `${this.title} ${this.#getStartTime()}:00 - ${this.#getEndTime()}:00 ${this.decription}`;
    }

    #getStartTime() {
        return Math.floor(this.getY() / HOUR_HEIGHT) - 1;
    }

    #getEndTime() {
        return Math.floor((this.getY() + this.getHeight()) / HOUR_HEIGHT) - 1;
    }
}