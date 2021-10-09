let mouseIsPressed = false;

window.addEventListener('mousedown', function(e) {
    mouseIsPressed = true;
})

window.addEventListener('mouseup', function(e) {
    mouseIsPressed = false;
})

let HTMLEvents = document.getElementsByClassName("event");
let events = [];

class Event {
    static #isMouseInsideDict = {};
    static #isMousePressedDict = {};
    static #idToEventDict = {}
    static fromId(id) {
        return Event.#idToEventDict[id];
    }

    #event = undefined;
    #lastMousePressEventMouseRelativeX = undefined;
    #lastMousePressEventMouseRelativeY = undefined;

    constructor(event) {
        this.#event = event
        Event.#isMouseInsideDict[this.getId()] = false;
        Event.#isMousePressedDict[this.getId()] = false;
        Event.#idToEventDict[this.getId()] = this;
        this.#event.addEventListener('mouseenter', function(e) {
            Event.#isMouseInsideDict[e.target.id] = true;
        })

        this.#event.addEventListener('mouseleave', function(e) {
            Event.#isMouseInsideDict[e.target.id] = false;
        })

        this.#event.addEventListener('mousedown', function(e) {
            Event.#isMousePressedDict[e.target.id] = true;
            let event = Event.fromId(e.target.id);
            e.target.style.color = "blue";
            event.#lastMousePressEventMouseRelativeX = e.pageX - event.getX();
            event.#lastMousePressEventMouseRelativeY = e.pageY - event.getY();
        })

        this.#event.addEventListener('mouseup', function(e) {
            Event.#isMousePressedDict[e.target.id] = false;
        })

        this.#event.addEventListener('mousemove', function(e) {
            let event = Event.fromId(e.target.id);
            if(event.isMousePressed()) {
                e.target.style.left = (e.pageX - event.#lastMousePressEventMouseRelativeX) + "px";
                e.target.style.top = (e.pageY - event.#lastMousePressEventMouseRelativeY) + "px";
            }
        })
    }

    isMousePressed() {
        return Event.#isMousePressedDict[this.getId()];
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

    setWidth(width) {
        this.#event.style.width = `${width}px`
    }

    setHeight(height) {
        this.#event.style.height = `${height}px`
    }
}

for(let i = 0; i < HTMLEvents.length; ++i) {
    events.push(new Event(HTMLEvents[i]))
}





/*
let ids = document.getElementsByClassName("event")[0];
let mouseIsPressedState = false
let mouseIsInside = false
window.addEventListener('mousedown', function(e) {
    mouseIsPressedState = true
})

window.addEventListener('mouseup', function(e) {
    mouseIsPressedState = false
})

window.addEventListener('mousemove', function(e) {
    mouseIsInside = (e.pageX >= parseInt(ids.style.left.substr(0, 3)) &&
        e.pageX <= (parseInt(ids.style.left.substr(0, 3)) + parseInt(ids.style.width.substr(0, 3))) &&
        e.pageY >= parseInt(ids.style.top.substr(0, 3)) &&
        e.pageY <= parseInt(ids.style.top.substr(0, 3)) + parseInt(ids.style.height.substr(0, 3)))
    console.log(mouseIsInside)
    console.log("x = " + e.pageX + "\n")
    console.log("y = " + e.pageY + "\n")
    console.log(ids.style.left)
    console.log(ids.style.top)
})

window.addEventListener('mousemove', function(e) {
    if(mouseIsPressedState === true && mouseIsInside === true) {
        console.log("bananaws")
        ids.style.left = "" + e.pageX;
        ids.style.top = "" + e.pageY;
    }
})



*/