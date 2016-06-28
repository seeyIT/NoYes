function Memo() {
    var self = this;

    this.gui = new GraphicalUserInterface();
    this.net = new Net();
    this.keyboard = new Keyboard();
    this.timer = new Timer();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

    this.startGame;

    function construct() {
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000);
        renderer.setSize(window.innerWidth, window.innerHeight);

        self.camera.position.x = 0;
        self.camera.position.y = 900;
        self.camera.position.z = 700;

        var cameraLookAtPoint = new THREE.Vector3(0, 0, 0);
        self.camera.lookAt(cameraLookAtPoint);

        var board = self.gui.get("board");
        document.body.appendChild(board);

        board.appendChild(renderer.domElement);
        var axis = new THREE.AxisHelper(200);
        self.scene.add(axis);

        var playField = new PlayField(function () {
            self.startGame(fieldsTable);

            //wylaczyc intro
        });

        var fieldsTable = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
        ];

        self.startGame = function (fieldsTable) {
            self.ready();
            console.log(fieldsTable);

            clearBoard();
            playField.setCards(fieldsTable);

            var _playField = playField.spawnPlayField();
            playFieldTable = playField.spawnPlayFieldTable();

            self.scene.add(_playField);
            getEmptyField();
        }

        //leci socket na wejscie i dostaje od servera tablice od 1 do 30 a 0 to puste pola, ta tablice przekazuje do playfilda i sie wykonuje
        //io.on{ 5 linijek z gory}'

        document.addEventListener("click", onMouseDown);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("keydown", onKeyDown);



        function AnimateScene() {
            requestAnimationFrame(AnimateScene);
            renderer.render(self.scene, self.camera);
        }

        AnimateScene();


        //////

        var startScreen = self.gui.get("startScreen");
        document.body.appendChild(startScreen);
        //document.body.appendChild(self.timer.getTimer());

        //self.loggedIn();
        var dialog = self.gui.get("dialog");
        document.body.appendChild(dialog);
    }


    this.currentElement = null;
    this.startPositionX = 0;
    this.startPositionZ = 0;
    this.firstCard = null;
    this.canMakeMove = false;
    this.isCheckingCards = false;
    this.playFieldTable;
    this.ready = function () {
        var canvas = document.querySelector("body > canvas");
        document.body.removeChild(canvas);

        var startScreen = self.gui.get("startScreen");
        startScreen.style.display = "flex";    }
    this.loggedIn = function () {
        var startScreen = self.gui.get("startScreen");
        document.body.removeChild(startScreen);

        var tip = self.gui.get("tip");
        document.body.appendChild(tip);

        var infoBar = self.gui.get("infoBar");
        document.body.appendChild(infoBar);

        var sidePanel = self.gui.get("sidePanel");
        var sidePanelToggleButton = self.gui.get("sidePanelToggleButton");

        self.keyboard.addEvent("p", function () {
            sidePanelToggleButton.click();
        }, true);

        self.keyboard.addEvent("r", function () {
            self.gui.switchBookmark();
        }, true);

        self.net.getRanking();

        document.body.appendChild(sidePanel);

        var helpBox = self.gui.get("helpBox");

        self.keyboard.addEvent("h", function () {
            helpBox.click();
        }, true);

        document.body.appendChild(helpBox);

        var board = self.gui.get("board");
        board.style.display = "block";
    }

    construct();
}