let HTMLEvents = document.getElementsByClassName("event");
let _events = [];

for(let i = 0; i < HTMLEvents.length; ++i) {
    _events.push(new Event(HTMLEvents[i], window));
}
