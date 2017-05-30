function Memo() {
    var self = this;

    this.client = io();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();
    this.gui = new GraphicUserInterface();

    function construct() {
        alert("OK");
        setTimeout(function () {
            self.gui.initialize();
        }, 1000);
    }

    construct();
}