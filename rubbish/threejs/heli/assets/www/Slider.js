function Slider() {
    var leftPanel = document.createElement("div");
    leftPanel.style.position = "absolute";
    leftPanel.style.top = 50 + "px";
    leftPanel.style.left = 0 + "px";
    leftPanel.style.width = 100 + "px";
    leftPanel.style.height = 700 + "px";
    leftPanel.style.backgroundColor = "grey";

    var leftSpeed = document.createElement("div");
    leftSpeed.setAttribute("id", "leftSpeed");
    leftSpeed.style.position = "absolute";
    leftSpeed.style.top = 600 + "px";
    leftSpeed.style.left = 0 + "px";
    leftSpeed.style.width = 150 + "px";
    leftSpeed.style.height = 100 + "px";
    leftSpeed.style.backgroundColor = "yellow";


    var leftSlider = document.createElement("div");
    leftSlider.setAttribute("id","leftSlider");
    leftSlider.style.position = "relative";
    leftSlider.style.top = 600 + "px";
    leftSlider.style.left = 0 + "px";
    leftSlider.style.width = 100 + "px";
    leftSlider.style.height = 100 + "px";
    leftSlider.style.backgroundColor = "blue";

    MoveSlider(leftSlider, leftSpeed,true);
    leftPanel.appendChild(leftSpeed);
    leftPanel.appendChild(leftSlider);
    document.body.appendChild(leftPanel);



    document.getElementById("leftSlider").onmousedown = function (e) {
        e.preventDefault();
        var max = this.offsetTop;
        var min = this.parentElement.getBoundingClientRect().top;

        this.onmouseup = function () {
            this.onmousemove = function () { }
        }
        this.onmouseout = function () {
            this.onmousemove = function () { }
        }
        this.onmousemove = function (e) {
            if (e.clientY-100 > 0 && e.clientY-100 < 600) {
                this.style.top = (parseInt(e.clientY)-100) + "px";

            }
            else if (e.clientY - 100 > 600) {
                this.style.top = 600 + "px";
            }
            else if (e.clientY - 100 < 0) {
                this.style.top = 0 + "px";
            }
        }
    }

    var rightPanel = document.createElement("div");
    rightPanel.style.position = "absolute";
    rightPanel.style.top = 50 + "px";
    rightPanel.style.left =( window.innerWidth -100) + "px";
    rightPanel.style.width = 100 + "px";
    rightPanel.style.height = 700 + "px";
    rightPanel.style.backgroundColor = "grey";

    var rightSpeed = document.createElement("div");
    rightSpeed.setAttribute("id", "rightSpeed");
    rightSpeed.style.position = "absolute";
    rightSpeed.style.top = 300 + "px";
    rightSpeed.style.left = -50 + "px";
    rightSpeed.style.width = 150 + "px";
    rightSpeed.style.height = 100 + "px";
    rightSpeed.style.backgroundColor = "yellow";


    var rightSlider = document.createElement("div");
    rightSlider.setAttribute("id", "rightSlider");
    rightSlider.style.position = "relative";
    rightSlider.style.top = 300 + "px";
    rightSlider.style.left = 0 + "px";
    rightSlider.style.width = 100 + "px";
    rightSlider.style.height = 100 + "px";
    rightSlider.style.backgroundColor = "blue";

    MoveSlider(rightSlider, rightSpeed,true);
    rightPanel.appendChild(rightSpeed);
    rightPanel.appendChild(rightSlider);
    document.body.appendChild(rightPanel);

    document.getElementById("rightSlider").onmousedown = function (e) {
        e.preventDefault();
        var max = this.offsetTop;
        var min = this.parentElement.getBoundingClientRect().top;

        this.onmouseup = function () {
            this.onmousemove = function () { }
        }
        this.onmouseout = function () {
            this.onmousemove = function () { }
        }
        this.onmousemove = function (e) {
            if (e.clientY - 100 > 0 && e.clientY - 100 < 600) {
                this.style.top = (parseInt(e.clientY) - 100) + "px";

            }
            else if (e.clientY - 100 > 600) {
                this.style.top = 600 + "px";
            }
            else if (e.clientY - 100 < 0) {
                this.style.top = 0 + "px";
            }
        }
    }

    var botPanel = document.createElement("div");
    botPanel.style.position = "absolute";
    botPanel.style.top = (window.innerHeight - 100) + "px";
    //botPanel.style.left = 200 + "px";
    botPanel.style.left = window.innerWidth/2 - 350 + "px";
    botPanel.style.width = 700 + "px";
    botPanel.style.height = 100 + "px";
    botPanel.style.backgroundColor = "grey";

    var botSpeed = document.createElement("div");
    botSpeed.setAttribute("id", "botSpeed");
    botSpeed.style.position = "absolute";
    botSpeed.style.top = -50 + "px";
    botSpeed.style.left = 300 + "px";
    botSpeed.style.width = 100 + "px";
    botSpeed.style.height = 150 + "px";
    botSpeed.style.backgroundColor = "yellow";


    var botSlider = document.createElement("div");
    botSlider.setAttribute("id", "botSlider");
    botSlider.style.position = "relative";
    botSlider.style.top = 00 + "px";
    botSlider.style.left = 300 + "px";
    botSlider.style.width = 100 + "px";
    botSlider.style.height = 100 + "px";
    botSlider.style.backgroundColor = "blue";

    MoveSlider(botSlider, botSpeed, false);
    botPanel.appendChild(botSpeed);
    botPanel.appendChild(botSlider);
    document.body.appendChild(botPanel);
    
    document.getElementById("botSlider").onmousedown = function (e) {
        e.preventDefault();
        var max = this.offsetTop;
        var min = this.parentElement.getBoundingClientRect().left;

        this.onmouseup = function () {
            this.onmousemove = function () { }
        }
        this.onmouseout = function () {
            this.onmousemove = function () { }
        }
        this.onmousemove = function (e) {
           // console.log(e.clientX)
            //console.log(e.clientX - parseInt(botPanel.style.left))
            //this.style.left = (parseInt(e.clientX)) + "px"
            if (e.clientX - parseInt(botPanel.style.left) > 50 && e.clientX - parseInt(botPanel.style.left) < 650) {
                this.style.left = (parseInt(e.clientX)) - parseInt(botPanel.style.left) -50 + "px";

            }
            
        }
    }

    this.getSliders = function () {
        var obj = {
            speed: parseInt(leftSpeed.style.top),
            rot: parseInt(botSpeed.style.left),
            height: parseInt(rightSpeed.style.top)
        }
        return obj;
    }

}

function MoveSlider(big, small, vertically) {
    if (vertically)
        f();
    else {
        g();
    }
    function f() {
        if (parseInt(big.style.top) != parseInt(small.style.top)) {
            if (Math.abs(parseInt(big.style.top) - parseInt(small.style.top)) < 2) {
                small.style.top = parseInt(big.style.top)+ "px";
            }
            if (parseInt(big.style.top) > parseInt(small.style.top)) {
                small.style.top = parseInt(small.style.top) + 2 + "px";
            } else if (parseInt(big.style.top) < parseInt(small.style.top)) {
                small.style.top = parseInt(small.style.top) - 2 + "px";
            }


        }
        
        setTimeout(f, 10);
    };
    
    function g() {
        
        if (parseInt(big.style.left) != parseInt(small.style.left)) {
            if (Math.abs(parseInt(big.style.left) - parseInt(small.style.left)) < 2) {
                small.style.left = parseInt(big.style.left) + "px";
            }
            if (parseInt(big.style.left) > parseInt(small.style.left)) {
                small.style.left = parseInt(small.style.left) + 2 + "px";
            } else if (parseInt(big.style.left) < parseInt(small.style.left)) {
                small.style.left = parseInt(small.style.left) - 2 + "px";
            }


        }
        setTimeout(g, 10);
    }
}

