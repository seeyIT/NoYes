function GaugesHeli() {
    var canvasLeft;
    var contextLeft;

    var canvasRight;
    var contextRight;

    var canvasBot;
    var contextBot;

    var showCompas = false;
    var gameIsPlaying = false;
    window.addEventListener("keydown", function (e) {
        if (!gameIsPlaying)
            return;
        if (e.which == 88) {
            showCompas = !showCompas;
        }
    })
    
    start()
    function start() {
        canvasLeft = document.createElement('canvas');
        canvasLeft.width = 50 // bez px;
        canvasLeft.height = 100 // bez px;
        canvasLeft.style.zIndex = 10;
        canvasLeft.style.position = "absolute";
        canvasLeft.style.left = "100px";
        canvasLeft.style.top = "650px";
        canvasLeft.style.background = "rgba(0, 0, 0,0.7)";
        contextLeft = canvasLeft.getContext("2d");

        document.getElementById("Board").appendChild(canvasLeft);
        contextLeft.font = "24px arial";
        contextLeft.fillStyle = "rgba(255, 255, 255, 1)";
        

        canvasRight = document.createElement('canvas');
        canvasRight.width = 50 // bez px;
        canvasRight.height = 100 // bez px;
        canvasRight.style.zIndex = 10;
        canvasRight.style.position = "absolute";
        canvasRight.style.left = ( window.innerWidth -150) + "px";
        canvasRight.style.top = "350px";
        canvasRight.style.background = "rgba(0, 0, 0,0.7)";
        contextRight = canvasRight.getContext("2d");

        document.getElementById("Board").appendChild(canvasRight);
        contextRight.font = "24px arial";
        contextRight.fillStyle = "rgba(255, 255, 255, 1)";



       

    }

    this.drawnCompasCanvas = function () {
        gameIsPlaying = true;
        canvasBot = document.createElement('canvas');
        canvasBot.width = 400 // bez px;
        canvasBot.height = 400 // bez px;
        canvasBot.style.zIndex = 10;
        canvasBot.style.position = "absolute";
        canvasBot.style.left = (window.innerWidth/2 - 200)+"px";
        canvasBot.style.top = "200px";
        // canvasBot.style.background = "rgba(0, 0, 0,0.0)";
        contextBot = canvasBot.getContext("2d");

        document.getElementById("Board").appendChild(canvasBot);
        contextBot.font = "35px arial";
        contextBot.fillStyle = "rgba(255, 255, 255, 1)";
    }

    this.drawBot = function(value) {
        if (!gameIsPlaying)
            return;
        contextBot.clearRect(0, 0, 400, 400);
        
        if (!showCompas) {
            canvasBot.style.display = "none";
        } else {
            canvasBot.style.display = "block";
        }
        contextBot.fillText("N", 200, 40);
        contextBot.fillText("E", 360, 200);
        contextBot.fillText("S", 200, 360);
        contextBot.fillText("W", 40, 200);

        contextBot.translate(200, 200)
        contextBot.rotate(Math.PI / 180*(-value/100))
        contextBot.translate(-200, -200)

    }

    this.drawRight = function (value) {
        contextRight.clearRect(0, 0, 150, 700);
        canvasRight.style.top = 350 + value + "px"

        contextRight.beginPath();
        contextRight.lineWidth = 7;
        contextRight.strokeStyle = "rgba(250, 0, 0,0.6)";
        contextRight.moveTo(30, 50); // początek linii
        contextRight.lineTo(50, 50); // koniec linii
        contextRight.stroke();
        contextRight.closePath();

        var xPos = 10;
        
        contextRight.fillText(50, xPos, -240 - value);
        contextRight.fillText(40, xPos, -180 - value);
        contextRight.fillText(30, xPos, -120 - value);
        contextRight.fillText(20, xPos, -60 - value);
        contextRight.fillText(10, xPos, 0 - value);
        contextRight.fillText(0, xPos, 60 - value);
        contextRight.fillText(-10, xPos, 120 - value);
        contextRight.fillText(-20, xPos, 180 - value);
        contextRight.fillText(-30, xPos, 240 - value);
        contextRight.fillText(-40, xPos, 300 - value);
        contextRight.fillText(-50, xPos, 360 - value);

    }

    this.drawLeft = function (value) {
        contextLeft.clearRect(0, 0, 150, 700);
        canvasLeft.style.top = 650 - value + "px"

        contextLeft.beginPath();
        contextLeft.lineWidth = 7;
        contextLeft.strokeStyle = "rgba(250, 0, 0,0.6)";
        contextLeft.moveTo(0, 50); // początek linii
        contextLeft.lineTo(20, 50); // koniec linii
        contextLeft.stroke();
        contextLeft.closePath();

        var xPos = 10;
        contextLeft.fillText(100, xPos, -540 + value);
        contextLeft.fillText(90, xPos, -480 + value);
        contextLeft.fillText(80, xPos, -420 + value);
        contextLeft.fillText(70, xPos, -360 + value);
        contextLeft.fillText(60, xPos, -300 + value);
        contextLeft.fillText(50, xPos, -240 + value);
        contextLeft.fillText(40, xPos, -180 + value);
        contextLeft.fillText(30, xPos, -120 + value);
        contextLeft.fillText(20, xPos, -60 + value);
        contextLeft.fillText(10, xPos, 0 + value);
        contextLeft.fillText(0, xPos, 60 + value);
    }



}