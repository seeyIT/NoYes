function PlayField(callback) {
    //var fieldsTable = [
    //    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    //];

    //nazwa,x,y,z,->scale  x,y,z ->rotation
    //var modelsPatternTable = [
    //    ["Football", 0, 0, 0, 0, 0, 0],
    //    ["lamp", 0, 0, 0, 0, 0, 0],
    //    ["M24_R_High_Poly_Version_obj", 10, 10, 10, 0, 2, -4],
    //    ["Clock_obj", 80,80, 80, 0, -2, 2.5],
    //    ["HazzBBerry", 0.1, 0.1, 0.1, -7, 0, 0],
    //    ["katana", 0.6, 0.6, 0.6, 0, -3, 0],
    //    ["Bullet", 80, 80, 80, 0, -3, 0]
    //    //TODO dodac reszte modeli 
    //]("Clock_obj", 
    var modelsPatternTable = [
        ["Clock_obj", { scaleX: 80, scaleY: 80, scaleZ: 80, rotX: 0.5, rotY: -2, rotZ: 2.5 }],
        ["HazzBBerry", { scaleX: 0.1, scaleY: 0.1, scaleZ: 0.1, rotX: -7, rotY: 0.5, rotZ: 0.5 }],
        ["katana", { scaleX: 0.6, scaleY: 0.6, scaleZ: 0.6, rotX: 0.5, rotY: -3, rotZ: 0.5 }],
        ["Bullet", { scaleX: 50, scaleY: 40, scaleZ: 50, rotX: 0.5, rotY: -3, rotZ: 0.5 }],
        ["Axe", { scaleX: 15, scaleY: 15, scaleZ: 15, rotX: 0.5, rotY: 0.5, rotZ: 0.5 }],
        ["Crate1", { scaleX: 1.5, scaleY: 1.5, scaleZ: 1.5, rotX: 0.5, rotY: 0.5, rotZ: 0.5 }],
        ["Hand", { scaleX: 1, scaleY: 1, scaleZ: 1, rotX: 0.5, rotY: 3, rotZ: 0.5 }],
        ["lamp", { scaleX: 1, scaleY: 1, scaleZ: 1, rotX: 0.5, rotY: 0.5, rotZ: 0.5 }],
        ["M4A1", { scaleX: 5, scaleY: 5, scaleZ: 5, rotX: 0.5, rotY: 3, rotZ: 0.5 }],
        ["TRANTULA", { scaleX: 500, scaleY: 500, scaleZ: 500, rotX: 0.5, rotY: 0.5, rotZ: 0.5 }],
        ["Tuna", { scaleX: 100, scaleY: 100, scaleZ: 100, rotX: 0.5, rotY: 3, rotZ: 0.5 }],
        ["crossbow", { scaleX: 1, scaleY: 1, scaleZ: 1, rotX: 0.5, rotY: 0.5, rotZ: 0.5 }],
        ["DUCK", { scaleX: 1, scaleY: 1, scaleZ: 1, rotX: 0.5, rotY: 0.5, rotZ: 0.5 }],
        ["M24_R_Low_Poly_Version_obj", { scaleX: 1, scaleY: 1, scaleZ: 1, rotX: 0.5, rotY: 0.5, rotZ: 0.5 }],
        ["Football", { scaleX: 1, scaleY: 1, scaleZ: 1, rotX: 0.5, rotY: 0.5, rotZ: 0.5 }]
        
        
        /*
        ["lamp", 0, 0, 0, 0, 0, 0],
        ["M24_R_High_Poly_Version_obj", 10, 10, 10, 0, 2, -4],
        ["Clock_obj", 80, 80, 80, 0, -2, 2.5],
        ["HazzBBerry", 0.1, 0.1, 0.1, -7, 0, 0],
        ["katana", 0.6, 0.6, 0.6, 0, -3, 0],
        ["Bullet", 80, 80, 80, 0, -3, 0],
        ["Football", 0, 0, 0, 0, 0, 0],
        ["lamp", 0, 0, 0, 0, 0, 0],
        ["M24_R_High_Poly_Version_obj", 10, 10, 10, 0, 2, -4],
        ["Clock_obj", 80, 80, 80, 0, -2, 2.5],
        ["HazzBBerry", 0.1, 0.1, 0.1, -7, 0, 0],
        ["katana", 0.6, 0.6, 0.6, 0, -3, 0],
        ["Bullet", 80, 80, 80, 0, -3, 0],
        ["Football", 0, 0, 0, 0, 0, 0]*/
    ];

    //var client = io();

    //client.emit("getDirectories", {});

    //client.on("getDirectories",
    //   function (data) {
    //       var _dirs = JSON.parse(data.directories)
    //       //console.log(_dirs)
    //   });

    var playField = new THREE.Object3D();

    var playFiledTable = [];
    for (var i = 0; i < 5; i++) {
        playFiledTable[i] = [];
    }
    var modelsNameTable = [];

    //TODO do sprawdzenia losowania, potem usunac i zastapic nazwami modelow
    //for (var i = 0; i < 15; i++) {
    //    if (i%4==0)
    //        modelsNameTable[i] = i;
    //    else {
    //        modelsNameTable[i] = 0;

    //    }
    //}

    

    

    //WYPELNIA LOSOWYMI, dostaje to
    /*
    //for (var i = 0; i < 15; i++) {               
    //    var _x = parseInt(Math.random() * 5);
    //    var _y = parseInt(Math.random() * 6);

    //    var _filedCells = 0;

    //    while (_filedCells<2) {
    //        if (playFiledTable[_x][_y] == undefined) {
    //            playFiledTable[_x][_y] = modelsNameTable[i];
    //            _filedCells++;
    //        } else {
    //             _x = parseInt(Math.random() * 5);
    //             _y = parseInt(Math.random() * 6);
    //        }

    //    }
    //}
    */
    
    //for (var i = 0; i < 5; i++) {
    //    for (var j = 0; j < 6; j++) {
    //        var a = document.createElement("div");
    //        a.style.display = "inline-block";
    //        a.style.margin = "3px";
            
    //        a.innerHTML = playFiledTable[i][j] + " ";
    //        if (playFiledTable[i][j] == 2)
    //            playFiledTable[i][j] = "Football";
    //        document.body.appendChild(a)
    //    }
    //    document.body.appendChild(document.createElement("br"))

    //}
    var _modelCounter = 0;
    var onlyLoadedModels = [];

    for (var i = 0; i < 30; i++) {
        var field = new Field(modelsPatternTable[i%15][0], 0,function() {
            _modelCounter++;
            if (_modelCounter > 29)
                callback();
        }, modelsPatternTable[i % 15][1]);
        var _field = field.spawnField();
        onlyLoadedModels[i] = _field;

    }
    


    this.setCards = function (fieldsTable/*1-30*/) {
       var _iterator = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                var _id = fieldsTable[_iterator];
                var _field = onlyLoadedModels[_id-1];
                _field.uuid = _id % 15;
                _field.name = _id;

                _field.children[0].name = _id; // light

                _field.children[1].name = _id; // card
                _field.children[1].uuid = _id; // card

                _field.children[2].uuid = _id; // model

                _field.position.x = -375 + (j * 150);
                _field.position.z = -300 + (i * 150);
                playField.add(_field);
                playFiledTable[i][j] = _field;


                _iterator++;
            }
        }
        
    }
    /*
    var _iterator = 0;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 6; j++) {
            var _modelValues = modelsPatternTable[(fieldsTable[_iterator] - 1)%15];
            

            
            var field = new Field(_modelValues[0], fieldsTable[_iterator], _modelValues[1]);
                var _field = field.spawnField();
                
                _field.position.x = -375 + (j * 150);
                _field.position.z = -300 + (i * 150);
                playField.add(_field);
                playFiledTable[i][j] = _field;
                _iterator++;
                console.log(11111)

        }

    }
    */

    this.spawnPlayFieldTable = function () {
        return playFiledTable;
    }

    

    this.spawnPlayField = function () {
        return playField;
    }
}