let HTMLEvents = document.getElementsByClassName("event");
let events = [];

class Event {
    static #idToEventDict = {}
    static addEventListeners(window) {
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

    #isMouseInsideState = false;
    #isMousePressedState = false;

    constructor(event) {
        this.isBeingDraggedState = false;
        this.#event = event;
        Event.#idToEventDict[this.getId()] = this;
        this.#event.addEventListener('mouseenter', function(e) {
            let event = Event.fromId(e.target.id);
            event.#isMouseInsideState = true;
        });

        this.#event.addEventListener('mouseleave', function(e) {
            let event = Event.fromId(e.target.id);
            event.#isMouseInsideState = false;
        });

        this.#event.addEventListener('mousedown', function(e) {
            let event = Event.fromId(e.target.id);
            event.#isMousePressedState = true;
            event.lastMousePressEventMouseRelativeX = e.pageX - event.getX();
            event.lastMousePressEventMouseRelativeY = e.pageY - event.getY();
        });

        this.#event.addEventListener('mouseup', function(e) {
            let event = Event.fromId(e.target.id);
            event.#isMousePressedState = false;
            console.log("mouse stopped being pressed");
        });
/*
        this.#event.addEventListener('mousemove', function(e) {
            let event = Event.fromId(e.target.id);
            if(event.isMousePressed()) {
                e.target.style.left = (e.pageX - event.#lastMousePressEventMouseRelativeX) + "px";
                e.target.style.top = (e.pageY - event.#lastMousePressEventMouseRelativeY) + "px";
            }
        });*/




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

for(let i = 0; i < HTMLEvents.length; ++i) {
    events.push(new Event(HTMLEvents[i]));
}

Event.addEventListeners(window);
