console.log("test");

class Event {
    static CURSOR_MODE_AUTO = 0
    static CURSOR_MODE_RESIZE_TOP = 1
    static CURSOR_MODE_RESIZE_BOT = 2
    static CURSOR_MODE_DRAG = 3
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
                console.log("wtf");
            for(let i = 0; i < events.length; ++i) {
                let event = events[i];
                if(event.isBeingDragged()) {
                    event.setX(e.pageX - event.#lastMousePressEventMouseRelativeX);
                    event.setY(e.pageY - event.#lastMousePressEventMouseRelativeY);
                }
                if(event.isNearTopHorizontalBorder(e.pageX, e.pageY)) {
                    console.log("testNHB");
                    document.body.style.cursor = "row-resize";
                } else document.body.style.cursor = "pointer";
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
    #isInTopResizeModeState = false;
    #isInBotResizeModeState = false;
    #isBeingTopResizedState = false;
    #isBeingBotResizedState = false;

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
            if(this_.isInTopResizeMode()) {
                let y = e.pageY;
                let height = y - this_.getY() + this_.getHeight();
                this_.setY(y);
                this_.setHeight(height);
                console.log("is")
                this_.#isBeingTopResizedState = true;
            } else if(this_.isInBotResizeMode()) {
                let height = e.pageY - this_.getY();
                this_.setHeight(height);
                this_.#isBeingBotResizedState = true;
            }
            else if(this_.isInside(e.pageX, e.pageY)) {
                this_.isBeingDraggedState = true;
            }
        });

        window.addEventListener('mouseup', function(e) {
            if(this_.isBeingResized()) {
                if(this_.isBeingTopResized()) {
                    this_.setY(Math.round(this_.getY()/HOUR_HEIGHT) * HOUR_HEIGHT)
                    this_.setHeight(Math.round(this_.getHeight()/HOUR_HEIGHT) * HOUR_HEIGHT)
                    if(this_.getHeight() < HOUR_HEIGHT) this_.setHeight(HOUR_HEIGHT)
                } else if(this_.isBeingBotResized()) {
this_.setY(Math.round(this_.getY()/HOUR_HEIGHT) * HOUR_HEIGHT)
                    this_.setHeight(Math.round(this_.getHeight()/HOUR_HEIGHT) * HOUR_HEIGHT)
                    if(this_.getHeight() < HOUR_HEIGHT) this_.setHeight(HOUR_HEIGHT)
                }

                {
                    let x = this_.getX()
                    let y = this_.getY()
                   let xhr = new XMLHttpRequest();
                    xhr.open('PUT', '', true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                         console.log("success");
                        } else console.log("failure");
                    };
                    let newStartDay = Math.floor((x - WEEK_VIEW_X1) / COLUMN_WIDTH - 1).toString();
                    let newStartHour = Math.floor((y - WEEK_VIEW_Y1) / HOUR_HEIGHT - 1).toString();
                    let newEndDay = Math.floor((x + this_.getWidth() - WEEK_VIEW_X1) / COLUMN_WIDTH - 1).toString();
                    let newEndHour = Math.floor((y + this_.getHeight() - WEEK_VIEW_Y1) / HOUR_HEIGHT - 1).toString();
                    console.log(newStartDay + "lksgjlakjg");
                    let data = {
                        "pk":this_.getPk(),
                        "new_start_day":newStartDay,
                        "new_start_hour":newStartHour,
                        "new_end_day":newEndDay,
                        "new_end_hour":newEndHour,
                    }
                    data = JSON.stringify(data);

                    xhr.send(data);}console.log("tegslgjlkjslj")

                this_.update();
                this_.#isBeingTopResizedState = false;
                this_.#isBeingBotResizedState = false;
            }
            if(this_.isBeingDragged()) {
                let relativeToColumn = this_.getX() % COLUMN_WIDTH;
                if(relativeToColumn*2 > COLUMN_WIDTH) relativeToColumn -= COLUMN_WIDTH;
                let relativeToHour = this_.getY() % HOUR_HEIGHT;
                if(relativeToHour*2 > HOUR_HEIGHT) relativeToHour -= HOUR_HEIGHT;
                let x = this_.getX() - relativeToColumn;
                let y = this_.getY() - relativeToHour;
                this_.setX(x);
                this_.setY(y);

                {
                   let xhr = new XMLHttpRequest();
                    xhr.open('PUT', '', true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                         console.log("success");
                        } else console.log("failure");
                    };
                    let newStartDay = Math.floor((x - WEEK_VIEW_X1) / COLUMN_WIDTH - 1).toString();
                    let newStartHour = Math.floor((y - WEEK_VIEW_Y1) / HOUR_HEIGHT - 1).toString();
                    let newEndDay = Math.floor((x + this_.getWidth() - WEEK_VIEW_X1) / COLUMN_WIDTH - 1).toString();
                    let newEndHour = Math.floor((y + this_.getHeight() - WEEK_VIEW_Y1) / HOUR_HEIGHT - 1).toString();
                    console.log(newStartDay + "lksgjlakjg");
                    let data = {
                        "pk":this_.getPk(),
                        "new_start_day":newStartDay,
                        "new_start_hour":newStartHour,
                        "new_end_day":newEndDay,
                        "new_end_hour":newEndHour,
                    }
                    data = JSON.stringify(data);

                    xhr.send(data);}console.log("tegslgjlkjslj")

                this_.update();
            }

            this_.isBeingDraggedState = false;
        });

        window.addEventListener('mousemove', function(e) {
            if(this_.isBeingTopResized()) {
                let y = e.pageY;
                if(e.pageY < HOUR_HEIGHT) y = HOUR_HEIGHT;
                if(e.pageY > HOUR_HEIGHT*25) y = HOUR_HEIGHT*25
                let height = this_.getY() - y + this_.getHeight();
                console.log("y = " + this_.getY())
                console.log("ey = " + y)
                console.log("h = " + this_.getHeight())
                this_.setY(y);
                this_.setHeight(height);
                console.log("is")
                this_.update()
            } else if(this_.isBeingBotResized()) {
                let y =e.pageY
                if(e.pageY < HOUR_HEIGHT) y = HOUR_HEIGHT;
                if(e.pageY > HOUR_HEIGHT*25) y = HOUR_HEIGHT*25
                let height =  y - this_.getY();
                this_.setHeight(height);
                this_.update()
            }

            if(this_.isNearTopHorizontalBorder(e.pageX, e.pageY)) {
                this_.#isInTopResizeModeState = true;
                document.body.style.cursor = "row-resize";
            } else if(this_.isNearBotHorizontalBorder(e.pageX, e.pageY)){
                this_.#isInBotResizeModeState = true;
                document.body.style.cursor = "row-resize";
            }
            else if(this_.isInTopResizeMode()) {
                    this_.#isInTopResizeModeState = false;
                    document.body.style.cursor = "auto";
                } else if(this_.isInBotResizeMode()) {
                this_.#isInBotResizeModeState = false;
                document.body.style.cursor = "auto"
            }


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

    isNearTopHorizontalBorder(x, y) {
        if(x >= this.getX() && x <= this.getX() + this.getWidth()) {
            if(y >= this.getY() - HOUR_HEIGHT/5 && y <= this.getY() + HOUR_HEIGHT/5)
                return true;


        }

        return false;
    }

    isNearBotHorizontalBorder(x, y) {
        if(x >= this.getX() && x <= this.getX() + this.getWidth()) {
            if(y >= this.getY() + this.getHeight() - HOUR_HEIGHT/5 && y <= this.getY() + this.getHeight() + HOUR_HEIGHT/5)
                return true
        }

        return false;
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

    setHeight(height) {
        this.#event.style.height = `${height}px`
    }

    getPk() {
        return this.getId().replace('event', '');
    }

    update() {
        this.#event.innerHTML = `${this.title} ${this.#getStartTime().toString().padStart(2, '0')}:00 - ${this.#getEndTime().toString().padStart(2, '0')}:00 ${this.decription}`;
    }

    #getStartTime() {
        return Math.round(this.getY() / HOUR_HEIGHT) - 1;
    }

    #getEndTime() {
        return Math.round((this.getY() + this.getHeight()) / HOUR_HEIGHT) - 1;
    }

    isInResizeMode() {
        return this.#isInBotResizeModeState || this.#isInTopResizeModeState;
    }

    isBeingResized() {
        return this.#isBeingTopResizedState || this.#isBeingBotResizedState;
    }

    cursor_mode(x, y) {
        if(x >= this.getX() && x <= this.getX() + this.getWidth()) {
            if(y >= this.getY() - HOUR_HEIGHT/5 && y <= this.getY() + HOUR_HEIGHT/5)
                return Event.CURSOR_MODE_RESIZE_TOP

            if(y >= this.getY() + this.getHeight() - HOUR_HEIGHT/5 && y <= this.getY() + this.getHeight() + HOUR_HEIGHT/5)
                return Event.CURSOR_MODE_RESIZE_BOT

            if(y >= this.getY() && y <= this.getY() + this.getHeight())
                return Event.CURSOR_MODE_DRAG
        }

        return Event.CURSOR_MODE_AUTO
    }

    isBeingTopResized() {
        return this.#isBeingTopResizedState;
    }

    isBeingBotResized() {
        return this.#isBeingBotResizedState;
    }

    isInTopResizeMode() {
        return this.#isInTopResizeModeState;
    }

    isInBotResizeMode() {
        return this.#isInBotResizeModeState;
    }
}