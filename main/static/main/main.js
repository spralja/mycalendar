let HTMLEvents = document.getElementsByClassName("event");
let events = [];



for(let i = 0; i < HTMLEvents.length; ++i) {
    events.push(new Event(HTMLEvents[i]));
}

Event.addEventListeners(window);
