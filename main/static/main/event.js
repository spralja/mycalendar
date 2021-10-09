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
            this_.isBeingDraggedState = false;
        });

        window.addEventListener('mousemove', function(e) {
           if(this_.isBeingDragged()) {
               this_.setX(e.pageX - this_.#lastMousePressEventMouseRelativeX);
               this_.setY(e.pageY - this_.#lastMousePressEventMouseRelativeY);
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
}