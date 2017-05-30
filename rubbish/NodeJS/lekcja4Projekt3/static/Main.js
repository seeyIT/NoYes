function Main() {
    var scene = new THREE.Scene();

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
    var nextBlocks =[];
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


    
   



    function AnimateScene() {
        
        camera.lookAt(cameraLookAtPoint);
        requestAnimationFrame(AnimateScene);
        renderer.render(scene, camera);
    }

    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();

    function KeyPress(e) {
        
        console.log(e.which)

        if (e.which == 101) //"e"
        {
            camera.position.x = Math.cos(angle / 90) * 100;
            // w prawo
            camera.position.z = Math.sin(angle / 90) * 100;
            angle--;
        } 
        else if(e.which == 113)
        {
            camera.position.x = Math.cos(angle / 90) * 100;
            // w lewo
            camera.position.z = Math.sin(angle / 90) * 100;
            angle++;
        } 
        else if (e.which == 114) {
            camera.position.y --;
            
        }
        else if (e.which == 118) { //z
            if (createdBox != null) {
                createdBox.material.color = new THREE.Color(0xff0000);
                for (var brick in nextBlocks) {
                    nextBlocks[brick].material.color = new THREE.Color(0xff0000);
                   
                }
            }

        }
        else if (e.which == 99) { //x 
            if (createdBox != null) {
                createdBox.material.color = new THREE.Color(0xff03f4);
                for (var brick in nextBlocks) {
                    nextBlocks[brick].material.color = new THREE.Color(0xff03f4);

                }
            }

        }
        else if (e.which == 120) { //c
            if (createdBox != null) {
                createdBox.material.color = new THREE.Color(0xfff000);
                for (var brick in nextBlocks) {
                    nextBlocks[brick].material.color = new THREE.Color(0xfff000);

                }
            }
        }
        else if (e.which == 122) { //v
            if (createdBox != null) {
                createdBox.material.color = new THREE.Color(0x0ff0f0);
                for (var brick in nextBlocks) {
                    nextBlocks[brick].material.color = new THREE.Color(0x0ff0f0);

                }

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
                scene.add(_brick);
                nextBlocks.push(_brick);
                
                ChangeBricksPosition()
            }
        }
        else if (e.which == 112) { // p rotate
            if (createdBox != null) {
                createdBox.rotation.y += (Math.PI / 2)
                direction++;
                for (var brick in nextBlocks) {
                    nextBlocks[brick].rotation.y += (Math.PI / 2);
                }
                ChangeBricksPosition()
            }
        }
    }


    

    function ChangeBricksPosition() {
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
        }
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
                createdBox = brick;
                brick.position.x = selectedBox.position.x;
                brick.position.y = selectedBox.position.y + 90;
                if (selectedBox.plane) {
                    brick.position.y -= 45;
                    selectedBox.plane = false;
                }

                brick.position.z = selectedBox.position.z;
                scene.add(brick);
                brick.build = true;
            }

            else if (selectedBox.goNext) {
                selectedBox.goNext = false;
                scene.remove(selectedBox);
                SpawnPlayField();
            }
            

            
        }


    }
}

