function Keyboard() {
    var self = this;

    var events = {
        onKeyDown: {},
        onKeyUp: {}
    };

    function construct() {
        window.addEventListener("keydown", keyDown);
        window.addEventListener("keyup", keyUp);
    }

    construct();

    function keyDown(e) {
        var key = e.which;

        if (events.onKeyDown[key] === undefined) return;

        for (var i in events.onKeyDown[key])
            events.onKeyDown[key][i]();
    }

    function keyUp(e) {
        var key = e.which;

        if (events.onKeyUp[key] === undefined) return;

        for (var i in events.onKeyUp[key])
            events.onKeyUp[key][i]();
    }

    this.addEvent = function (key, action, onKeyUp) {
        if (onKeyUp === null || onKeyUp === undefined)
            onKeyUp = false;

        if (typeof key == "string") //if(key instanceof  String)
            key = key.toLowerCase().charCodeAt(0) - 32;

        

        if (!onKeyUp) {
            if (events.onKeyDown[key] === undefined)
                events.onKeyDown[key] = [action]
            else
                events.onKeyDown[key].push(action);
        }
        else {
            if (events.onKeyUp[key] === undefined)
                events.onKeyUp[key] = [action]
            else
                events.onKeyUp[key].push(action);
        }
    }

    this.events = events;
}