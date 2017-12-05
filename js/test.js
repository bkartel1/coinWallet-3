var wsUri = "ws://echo.websocket.org/"; // just free WS-server for tests
var websocket;

function init() {testWebSocket();}

function testWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function (evt) {
        onOpen(evt)
    };
    websocket.onclose = function (evt) {
        onClose(evt)
    };
    websocket.onmessage = function (evt) {
        onMessage(evt)
    };
    websocket.onerror = function (evt) {
        onError(evt)
    };
}

function onOpen() {
    writeToScreen("CONNECTED");
    doSend("WebSocket rocks");
}
function onClose() {
    writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
    writeToScreen('RESPONSE: ' + evt.data);
    websocket.close();
}

function onError(evt) {
    writeToScreen('ERROR: ' + evt.data);
}

function doSend(message) {
    writeToScreen("SENT: " + message);
    websocket.send(message);
}

function writeToScreen(message) {
    console.log(message);
}

window.addEventListener("load", init, false);

