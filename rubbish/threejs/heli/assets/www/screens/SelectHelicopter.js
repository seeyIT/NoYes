function SelectHelicopter() {
    
    var container = document.createElement("div");
    var helicopter = new Helicopter();
    var helicopterBox = helicopter.SpawnHelicopter();

    var div = document.createElement("div");
    div.style.width = window.innerWidth + "px";
    div.style.height = window.innerHeight + "px";
    div.style.backgroundColor = "green"
    
    div.style.position = "absolute";
    div.style.left = 0 + "px";
    div.style.top = 0 + "px";

    //document.body.appendChild(div);
    container.appendChild(div);

    var basicHeli = document.createElement("div");

    basicHeli.addEventListener("click", function () {
        helicopter = new Helicopter();
        helicopterBox = helicopter.SpawnHelicopter();
    });
    basicHeli.style.width = 300 +"px";
    basicHeli.style.height = 300 + "px";
    basicHeli.style.backgroundImage = "url('materials/heli.png')";
    basicHeli.style.backgroundRepeat = "no-repeat";
    basicHeli.style.backgroundSize = "cover"
    basicHeli.style.position = "absolute";
    basicHeli.style.left = 50 + "px";
    basicHeli.style.top = 150 + "px";
   
    //document.body.appendChild(basicHeli);
    div.appendChild(basicHeli);

    var modelHeli = document.createElement("div");
    modelHeli.addEventListener("click", function () {
        helicopter = new HeliModel();
        helicopterBox = helicopter.spawnModel();
    });

    modelHeli.style.width = 300 + "px";
    modelHeli.style.height = 300 + "px";
    modelHeli.style.backgroundImage = "url('materials/heliModel.png')";
    modelHeli.style.backgroundRepeat = "no-repeat";
    modelHeli.style.backgroundSize = "cover"
    modelHeli.style.position = "absolute";
    modelHeli.style.left = 550 + "px";
    modelHeli.style.top = 150 + "px";
    div.appendChild(modelHeli);

    var startButton = document.createElement("div");
    startButton.style.innerHeight = 100 + "px";
    startButton.style.position = "absolute";
    startButton.style.left = 550 + "px";
    startButton.style.top = 550 + "px";
    startButton.innerHTML = "START";
    startButton.style.fontSize = "90px";
    startButton.style.color = "yellow";
    //document.body.appendChild(modelHeli);
    div.appendChild(startButton);

    var heliNumer;

    this.spawnHeliOptions = function() {
        return div;
    }
    this.spawnHeli = function () {
        return startButton;
    }

    function removeAll() {
        div.style.display = "none";
        modelHeli.style.display = "none";
        basicHeli.style.display = "none";
    }

    this.spawnSelectedHeli = function() {
        removeAll();
        return {helicopter, helicopterBox};

    }

    

}