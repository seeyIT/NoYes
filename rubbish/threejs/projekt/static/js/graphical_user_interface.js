function GraphicUserInterface() {
    var self = this;

    function construct() {

    }

    construct();

    this.initialize = function () {
        memo.client.emit("test", {
            foo: "bar"
        });
    }
}