function Main() {
    var scene;
    var client = io();
    var user;
    var loginButton = document.getElementById("Zaloguj");
    loginButton.addEventListener("click",function() {
        user = document.getElementById("LoginNick").value;
        if (user != "admin") {
            client.emit("loginNormal",
            {
                login: user,
                password: password
            });
        } else {
            client.emit("loginAdmin",
            {
                login: user,
                password: password
            });
        }
        document.getElementById("Logreg").remove();
        StartGame();
    });
    var registerButton = document.getElementById("Rejestracja");

    var buildingsBoard = document.getElementById("Buildings");

    var password = document.getElementById("LoginPass").innerHTML;

    var buildings = [];
    var saveButton = document.getElementById("SaveButton");
    saveButton.addEventListener("click", Save);
    function Save() {
        if (user === "admin") return;
        
        var boardName = prompt("name");
         

        var sceneObjects = scene.children;

        var brickToSend = [];
        console.log(sceneObjects)
        for (var child in sceneObjects) {
            if (sceneObjects[child].brick) {
                brickToSend.push(sceneObjects[child]);
            }
        }
        console.log(brickToSend)

        for (var child in brickToSend) {
            client.emit("save",
             {
                 name: boardName,
                 user:user,
                 positionX:brickToSend[child].position.x,
                 positionY:brickToSend[child].position.y,
                 positionZ:brickToSend[child].position.z,
                 color: brickToSend[child].material.color.getHex().toString(16)
             });
        }

        //name: { type: String, required: true },
        //user: { type: String, required: true },
        //positionX: { type: Number, required: true },
        //positionY: { type: Number, required: true },
        //positionZ: { type: Number, required: true },
        //color: { type: String,  required: true },
    }


    client.on("loginAdmin",
       function (data) {
           GetUsersBuildings(data.status);
       });

   
    client.on("loginNormal",
        function(data) {
            GetBuildingsName(data.status)
        });


    var wholeData;

    function GetUsersBuildings(data) {
        wholeData = data;

        var _length = data.length;

        var _new = true;
        for (var building in data) {
            _new = true;
            for (var name in buildings) {
                if (data[building].user == buildings[name]) {
                    _new = false;
                }

            }
            if (_new)
                buildings.push(data[building].user);

        }

        DisplayBuildingsName()
    }


    function GetBuildingsName(data) {
        wholeData = data;

        var _length = data.length;
        var _new = true;
        for (var building in data) {
            _new = true;
            for (var name in buildings) {
                if (data[building].name == buildings[name]) {
                    _new = false;
                }

            }
            if (_new)
                buildings.push(data[building].name);

        }
        
        DisplayBuildingsName();

    }

    function ClearBricks() {
        var _children = scene.children;
        for (var child in _children) {
            if(_children[child].brick)
                scene.remove(_children[child]);

        }
        var _children = scene.children;
        for (var child in _children) {
            if (_children[child].brick)
                scene.remove(_children[child]);

        }
        var _children = scene.children;
        for (var child in _children) {
            if (_children[child].brick)
                scene.remove(_children[child]);

        }
        var _children = scene.children;
        for (var child in _children) {
            if (_children[child].brick)
                scene.remove(_children[child]);

        }
       
    }

    

    function DisplayBuildingsName() {
        buildingsBoard.style.display = "block";

        var _divAll = document.createElement("div");
        _divAll.style.width = 100 + "px";
        _divAll.style.height = 50 + "px";
        _divAll.style.border = "1px black solid";

        _divAll.style.backgroundColor = "pink";

        _divAll.innerHTML = "ALL";
        _divAll.addEventListener("click", function () {
            ClearBricks();
            LoadBricks();
        });
        buildingsBoard.appendChild(_divAll)

        for (var name in buildings) {
            var _div = document.createElement("div");
            _div.style.width = 100 + "px";
            _div.style.height = 50 + "px";
            _div.style.backgroundColor = "pink";
            _div.style.border = "1px black solid";
            _div.innerHTML = buildings[name];
            _div.addEventListener("click", function () {
                ClearBricks();
                console.log(this.innerHTML)
                LoadBricks(this.innerHTML);
            });
            buildingsBoard.appendChild(_div)

        }
    }

    function LoadBricks(bricksName) {

        //console.log(wholeData)

        if (bricksName != null) {
            for (var bricks in wholeData) {
                if (wholeData[bricks].name === bricksName && user!="admin") {
                    var _x = wholeData[bricks].positionX;
                    var _y = wholeData[bricks].positionY;
                    var _z = wholeData[bricks].positionZ;

                    var b = new Brick();
                    var brick = b.spawnBrick();
                    brick.brick = true;
                    brick.position.x = _x;
                    brick.position.y = _y;
                    brick.position.z = _z;

                    brick.material.color = new THREE.Color("#" + wholeData[bricks].color.toString())
                    brick.name = brick.uuid;
                    scene.add(brick);
                    brick.build = true;

                }
                else if (wholeData[bricks].user === bricksName && user === "admin") {
                    var _x = wholeData[bricks].positionX;
                    var _y = wholeData[bricks].positionY;
                    var _z = wholeData[bricks].positionZ;

                    var b = new Brick();
                    var brick = b.spawnBrick();
                    brick.brick = true;
                    brick.position.x = _x;
                    brick.position.y = _y;
                    brick.position.z = _z;

                    brick.material.color = new THREE.Color("#" + wholeData[bricks].color.toString())
                    brick.name = brick.uuid;
                    scene.add(brick);
                    brick.build = true;
                }
                //ladowanie pojeynczego klocka
            }
        } else {
            //wszystki
            for (var bricks in wholeData) {
                
                    var _x = wholeData[bricks].positionX;
                    var _y = wholeData[bricks].positionY;
                    var _z = wholeData[bricks].positionZ;

                    var b = new Brick();
                    var brick = b.spawnBrick();
                    brick.brick = true;
                    brick.position.x = _x;
                    brick.position.y = _y ;
                    brick.position.z = _z;
                    brick.material.color = new THREE.Color("#" + wholeData[bricks].color.toString())

                    //brick.material.color = new THREE.Color(wholeData[bricks].color)
                    brick.name = brick.uuid;

                    scene.add(brick);
                    brick.build = true;

               
            }
        }
    }

    function StartGame() {
        scene = new THREE.Scene();
        //http://stackoverflow.com/questions/19426559/three-js-access-scene-objects-by-name-or-id
        var camera = new THREE.OrthographicCamera(
                900 / -2,
            900 / 2,
            900 / 2,
            900 / -2,
            -5000,
            5000
            );
        var renderer = new THREE.WebGLRenderer();
        var angle = 50;
        var selectedBox;
        var createdBox;
        var nextBlocks = [];
        var direction = 0;

        renderer.setClearColor(0x00ff00);
        renderer.setSize(900, 900);
        //mesh = new THREE.Mesh(geometry, material);
        //scene.add(mesh);
        var axis = new THREE.AxisHelper(200);
        scene.add(axis);

        document.getElementById("Board").appendChild(renderer.domElement);
        document.addEventListener("click", onMouseDown);
        document.addEventListener("keypress", KeyPress);

        camera.position.x = 10;
        camera.position.y = 100;
        camera.position.z = 0;

        camera.position.x = Math.cos(angle / 90) * 100;
        camera.position.z = Math.sin(angle / 90) * 100;

        var cameraLookAtPoint = new THREE.Vector3(0, 0, 0);
        camera.lookAt(cameraLookAtPoint);

        AnimateScene();

        var text = new Intro();
        scene.add(text.showText());


        //var socket = io();
        //socket.on('news', function (e) {
        //    client.emit("mouseposition", {
        //        posX: e.clientX,
        //        posY: e.clientY
        //    })
        //});



        //document.addEventListener("mousemove", function (e) {
        //    client.emit("mouseposition", {
        //        posX: e.clientX,
        //        posY: e.clientY
        //    })

        //})
        client.on("buildBrick", function (data) {

            var b = new Brick();
            brick = b.spawnBrick();
            brick.position.x = data.position.posX;
            brick.position.y = data.position.posY;
            brick.position.z = data.position.posZ;

            brick.build = true;
            brick.uuid = data.position.uuid;
            brick.name = brick.uuid;


            scene.add(brick);


        })

        client.on("addBrick", function (data) {

            var uuid = JSON.parse(data.uuidTable);
            var pos = JSON.parse(data.positionTable);
            var _uuidLen = uuid.length

            for (var i = 0; i < _uuidLen; i++) {
                var brick = scene.getObjectByName(uuid[i]);
                if (brick == undefined) {
                    var b = new Brick();
                    brick = b.spawnBrick();
                    brick.uuid = uuid[i];
                    brick.name = uuid[i];

                    scene.add(brick)

                }


                brick.position.x = pos[i].x;
                brick.position.y = pos[i].y;
                brick.position.z = pos[i].z;
            }
        })

        client.on("colorBrick", function (data) {
            var uuid = JSON.parse(data.uuidTable);
            var color = data.color;
            var _uuidLen = uuid.length
            for (var i = 0; i < _uuidLen; i++) {
                var brick = scene.getObjectByName(uuid[i]);


                brick.material.color = new THREE.Color(color);

            }

        })

        client.emit("register", {
            object: 1

        })

        client.on("register", function (data) {

            console.log(data)

        })
        function AnimateScene() {

            camera.lookAt(cameraLookAtPoint);
            requestAnimationFrame(AnimateScene);
            renderer.render(scene, camera);
        }

        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2();

        function KeyPress(e) {

            //console.log(e.which)
            if (e.which == 101) //"e"
            {
                camera.position.x = Math.cos(angle / 90) * 100;
                // w prawo
                camera.position.z = Math.sin(angle / 90) * 100;
                angle--;
            }
            else if (e.which == 113) {
                camera.position.x = Math.cos(angle / 90) * 100;
                // w lewo
                camera.position.z = Math.sin(angle / 90) * 100;
                angle++;
            }
            else if (e.which == 114) {
                camera.position.y--;

            }
            else if (e.which == 118) { //z
                if (createdBox != null) {
                    var uuidTable = [];
                    uuidTable.push(createdBox.uuid)
                    createdBox.material.color = new THREE.Color(0xff0000);
                    for (var brick in nextBlocks) {
                        nextBlocks[brick].material.color = new THREE.Color(0xff0000);
                        uuidTable.push(nextBlocks[brick].uuid);

                    }


                    client.emit("colorBrick", {
                        uuid: JSON.stringify(uuidTable),
                        color: 0xff0000,
                    })
                }

            }
            else if (e.which == 99) { //x 
                if (createdBox != null) {
                    var uuidTable = [];
                    uuidTable.push(createdBox.uuid)
                    createdBox.material.color = new THREE.Color(0xff03f4);
                    for (var brick in nextBlocks) {
                        nextBlocks[brick].material.color = new THREE.Color(0xff03f4);
                        uuidTable.push(nextBlocks[brick].uuid);

                    }


                    client.emit("colorBrick", {
                        uuid: JSON.stringify(uuidTable),
                        color: 0xff03f4,
                    })
                }

            }
            else if (e.which == 120) { //c
                if (createdBox != null) {
                    var uuidTable = [];
                    uuidTable.push(createdBox.uuid)
                    createdBox.material.color = new THREE.Color(0xfff000);
                    for (var brick in nextBlocks) {
                        nextBlocks[brick].material.color = new THREE.Color(0xfff000);
                        uuidTable.push(nextBlocks[brick].uuid);

                    }


                    client.emit("colorBrick", {
                        uuid: JSON.stringify(uuidTable),
                        color: 0xfff000,
                    })
                }
            }
            else if (e.which == 122) { //v
                if (createdBox != null) {
                    var uuidTable = [];
                    uuidTable.push(createdBox.uuid)
                    createdBox.material.color = new THREE.Color(0x0ff0f0);
                    for (var brick in nextBlocks) {
                        nextBlocks[brick].material.color = new THREE.Color(0x0ff0f0);
                        uuidTable.push(nextBlocks[brick].uuid);

                    }


                    client.emit("colorBrick", {
                        uuid: JSON.stringify(uuidTable),
                        color: 0x0ff0f0,
                    })
                }
            }
            else if (e.which == 52) {
                if (createdBox != null) {
                    createdBox.position.z += 50;
                    ChangeBricksPosition();
                }
            }
            else if (e.which == 56) {
                if (createdBox != null) {
                    createdBox.position.z -= 50;
                    ChangeBricksPosition();


                }
            }
            else if (e.which == 54) {
                if (createdBox != null) {
                    createdBox.position.x -= 50;
                    ChangeBricksPosition();
                }
            }

            else if (e.which == 111) { // o add
                if (createdBox != null) {
                    var _b = new Brick();
                    var _brick = _b.spawnBrick();
                    _brick.brick = true;
                    scene.add(_brick);
                    nextBlocks.push(_brick);

                    ChangeBricksPosition();


                }
            }
            else if (e.which == 112) { // p rotate
                if (createdBox != null) {
                    direction++;
                    ChangeBricksPosition()
                }
            }
        }


        function ChangeBricksPosition() {
            var uuidTable = [];
            var positionTable = [];

            uuidTable.push(createdBox.uuid)
            positionTable.push(createdBox.position);

            for (var brick in nextBlocks) {
                nextBlocks[brick].position.x = createdBox.position.x;
                nextBlocks[brick].position.y = createdBox.position.y;
                nextBlocks[brick].position.z = createdBox.position.z;


                if (direction % 4 == 0)
                    nextBlocks[brick].position.x = createdBox.position.x + (100 * (brick));
                else if (direction % 4 == 1) {
                    nextBlocks[brick].position.z = createdBox.position.z + (100 * (brick));
                }
                else if (direction % 4 == 2) {
                    nextBlocks[brick].position.x = createdBox.position.x - (100 * (brick));
                }
                else if (direction % 4 == 3) {
                    nextBlocks[brick].position.z = createdBox.position.z - (100 * (brick));
                }

                uuidTable.push(nextBlocks[brick].uuid);
                positionTable.push(nextBlocks[brick].position);

            }


            client.emit("addBrick", {
                uuid: JSON.stringify(uuidTable),
                pos: JSON.stringify(positionTable)
            })

        }


        function SpawnPlayField() {

            var size = 2;
            for (var i = -size; i < size; i++) {
                for (var j = -size; j < size; j++) {
                    var field = new Field();
                    var board = field.makeBoard();
                    board.position.x = 100 * i;
                    board.position.y = 0;
                    board.position.z = 100 * j;
                    board.build = true;
                    board.plane = true;

                    scene.add(board);
                }
            }
        }

        function onMouseDown(event) {
            mouseVector.x = (event.clientX / 900) * 2 - 1;
            mouseVector.y = -(event.clientY / 900) * 2 + 1;

            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children);

            if (intersects.length > 0) {
                selectedBox = intersects[0].object;

                if (selectedBox.build) {
                    nextBlocks = [];
                    direction = 0;
                    selectedBox.build = false;
                    var b = new Brick();
                    brick = b.spawnBrick();
                    brick.brick = true;
                    createdBox = brick;
                    brick.position.x = selectedBox.position.x;
                    brick.position.y = selectedBox.position.y + 90;
                    if (selectedBox.plane) {
                        brick.position.y -= 45;
                        selectedBox.plane = false;
                    }

                    brick.position.z = selectedBox.position.z;
                    brick.name = brick.uuid;

                    scene.add(brick);
                    brick.build = true;

                    client.emit("buildBrick", {
                        posX: brick.position.x,
                        posY: brick.position.y,
                        posZ: brick.position.z,
                        uuid: brick.uuid
                    })

                }

                else if (selectedBox.goNext) {
                    selectedBox.goNext = false;
                    scene.remove(selectedBox);
                    SpawnPlayField();
                }



            }


        }
        
    }
    
}

