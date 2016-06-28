function Timer() {
    const DEG = (Math.PI / 180);

    var self = this;

    var timer = document.createElement("canvas");
    var ctx = timer.getContext("2d");
    var maxTime = 15;
    var countdown = false;

    function construct() {
        timer.width = 100;
        timer.height = 100;
    }

    construct();

    this.update = function (time) {
        var clockTime = time;

        if (clockTime == 15)
            clockTime = 0;
        else if (clockTime == 0)
            clockTime = 15;

        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 100, 100);
        ctx.closePath();


        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.arc(50, 50, 45, (-90 * DEG) + (360 * DEG) * (clockTime / maxTime), -90 * DEG, false);
        ctx.lineTo(50, 50);
        ctx.fillStyle = '#00ffff';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(50, 50, 35, 0, 360 * DEG);
        ctx.lineTo(50, 50);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.font = '30px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#00ffff';
        ctx.fillText(Math.ceil(maxTime - time), 50, 50);
        ctx.closePath();
    }

    this.clear = function () {
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 100, 100);
        ctx.closePath();
    }

    this.getTimer = function () {
        return timer;
    }
}