let HTMLEvents = document.getElementsByClassName("event");
let _events = [];

for(let i = 0; i < HTMLEvents.length; ++i) {
    _events.push(new Event(HTMLEvents[i], window));
}
/*
const sendHttpRequest = (method, url, data) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("success");
        } else console.log("failure");
    };

    data = JSON.stringify(data);
    xhr.send(data);
};


sendHttpRequest('PUT', '', {"test":"test"})
*/