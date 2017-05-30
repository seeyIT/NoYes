function Main()
{
    //1452
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);

    var renderer = new THREE.WebGLRenderer();
    renderer.autoClear = false;
    var selectedBox;
    var box = new THREE.BoxGeometry(20, 20, 20, 1, 1, 1);
    var angle = 0;
    renderer.setClearColor(0xff0000);
    renderer.setSize(window.innerWidth, window.innerHeight);



    var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('materials/mat3.png') })

    var ground = new THREE.PlaneBufferGeometry(200, 200);
    var mesh = new THREE.Mesh(ground, material);

    mesh.rotateX(Math.PI / 2);
    mesh.material.map.repeat.set(12, 12); //gęstość powtarzania
    mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping; // powtarzanie w obu 
    mesh.position.setY(-10);
    //ZIEMIA
    //scene.add(mesh);


    var axis = new THREE.AxisHelper(200);
    scene.add(axis);

    document.getElementById("Board").appendChild(renderer.domElement);
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keypress", onKeyPress, false);
    document.addEventListener("mousedown", onMouseDown, false);

    camera.position.x = -100;
    camera.position.y = 100;
    camera.position.z = 0;

    var cameraLookAtPoint = new THREE.Vector3(0, 0, 0);
    camera.lookAt(cameraLookAtPoint);


    
    

    var lightT = new THREE.PointLight(0xff00ff, 1);
    lightT.position.set(0, 50, -50);
    scene.add(lightT);

    var lightMatT = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("materials/mat3.png"),
    })
    var lightSphereT = new THREE.SphereGeometry(3, 32, 32);
    var lightMeshT = new THREE.Mesh(lightSphereT, lightMatT);
    lightMeshT.position.set(0, 50, -50);
    scene.add(lightMeshT);


    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2(); // wektor (x,y) wykorzystany bedzie do określenie pozycji myszy na ekranie


    var heliSelection = new SelectHelicopter();
    var helicopter = new Helicopter();
    var helicopterBox;
    
    document.body.appendChild(heliSelection.spawnHeliOptions());
    var gaugesHeli;
    var slider;

    var option = heliSelection.spawnHeli();
    option.addEventListener("click", function () {
        helicopter = heliSelection.spawnSelectedHeli()["helicopter"];
        helicopterBox = heliSelection.spawnSelectedHeli()["helicopterBox"];
        scene.add(helicopterBox);
        helicopterBox.add(camera);
        slider = new Slider();
        gaugesHeli = new GaugesHeli();
        gaugesHeli.drawnCompasCanvas();

    });


    var camaraViews = new CamaraViews();
    var cameraViewsOptions = camaraViews.returnButtons();
    for (var i in cameraViewsOptions) {
        if (cameraViewsOptions[i] instanceof HTMLDivElement) {
            cameraViewsOptions[i].addEventListener("click", function () {
               
                
                camera.position.x =  parseInt(this.getAttribute("x") ) +10;
                camera.position.y =  parseInt(this.getAttribute("y")) + 20;
                camera.position.z =  parseInt(this.getAttribute("z")) ;
                console.log(camera.parent.position)
                console.log(camera.parent.mesh)
                console.log(helicopterBox.position)
                console.log("------")
                if (this.getAttribute("Kokpit") =='1') {
                    camera.lookAt(new THREE.Vector3(-100,0,0))
                } else {
                    //camera.lookAt(new THREE.Vector3(helicopterBox.position.x/2, helicopterBox.position.y/2 , helicopterBox.position.z/2))
                    //console.log(new THREE.Vector3(helicopterBox.position.x , helicopterBox.position.y , helicopterBox.position.z))
                    camera.lookAt(cameraLookAtPoint)
                }
            });
        }
        
    }


    var skybox = new Skybox();
    scene.add(skybox.SpawnSky());

    //var building = new Building();
    //scene.add(building.SpawnBuilding("building",20,20));

   
    
    


    //var stats = new Stats();
    //stats.showPanel(0);
    //document.body.appendChild(stats.dom);


   
    
    
    function AnimateScene() {
       
        //stats.begin();
        
        //stats.end();

        

        
        
        //console.log(heliRot)
        requestAnimationFrame(AnimateScene);
        renderer.render(scene, camera);
        //camera.position.y = helicopterBox.position.y+100;
        //camera.position.needsUpdate = true;
        helicopter.PropRotation();
        try {
            var heliHeight = slider.getSliders().height - 300;
            var heliSpeedslider = slider.getSliders().speed;
            var heliRot = slider.getSliders().rot - 300;

            var heliHeight = slider.getSliders().height - 300;

            var heliSpeedslider = 600 - slider.getSliders().speed;
            var heliRot = slider.getSliders().rot - 300;
            helicopterBox.rotateY(Math.PI / 180 * heliRot/100);
        
            helicopterBox.translateX(-heliSpeedslider/100);
            helicopterBox.translateY(-heliHeight / 100);
            //helicopterBox.mesh.rotation.z = Math.PI / 180 * heliSpeedslider;

            gaugesHeli.drawLeft(heliSpeedslider);

            gaugesHeli.drawRight(heliHeight);
            gaugesHeli.drawBot(heliRot)
        }
        catch (e){}
    }

    function onKeyPress(e) {
        if (e.which = 113) //"q"
        {

            //var axis = new THREE.Vector3(0, 0, 0.5);//tilted a bit on x and y - feel free to plug your different axis here
            ////in your update/draw function
            //rad = 0.3;

            //console.log(helicopter)
            
            //return;
            //var camRotation;
            //var camPos;
            //     for (var child in children) {
               
            //         if (children[child].type == "PerspectiveCamera") {
            //             camRotation = children[child].rotation;
            //             camPos = children[child].position;
            //         }
            //         //child.rotation.z = Math.PI / 180 * 50;
            //     }
            ////helicopterBox.rotation.z = Math.PI / 180 * 50;
            //console.log(helicopterBox)
            var children = helicopterBox.children;
            helicopterBox.rotateZ(Math.PI / 180*50);//  rotation.x += Math.PI / 180 * 50;
            for (var child in children) {
               
                if (children[child].type == "PerspectiveCamera") {
                    console.log(children[child].rotation.x)
                    children[child].lookAt = helicopter;
                    
                }
                //child.rotation.z = Math.PI / 180 * 50;
            }
        }
    }


    AnimateScene();
    function onKeyDown(event) {

        var keyCode = event.which; // kod klawisza

        //console.log(keyCode)

        if (keyCode == 87) {
            helicopterBox.position.y++;
        }
        else if (keyCode == 83) {
            helicopterBox.position.y--;
        }
        //if (keyCode == 40) {
        //    camera.position.y--;
        //}
        //else if (keyCode == 38) {
        //    camera.position.y++;

        //}
        //else if (keyCode == 39) {
        //    camera.position.x = Math.cos(angle / 90) * 100; // w prawo
        //    camera.position.z = Math.sin(angle / 90) * 100;
        //    angle -= 5;

        //}
        //else if (keyCode == 37) {
        //    camera.position.x = Math.cos(angle / 90) * 100; // w lewo
        //    camera.position.z = Math.sin(angle / 90) * 100;
        //    angle+=5;

        //}
        //else if (selectedBox != null && keyCode == 87)
        //    selectedBox.position.y++; //W
        //else if (selectedBox != null && keyCode == 83)
        //    selectedBox.position.y--; //S
        //else if (selectedBox != null && keyCode == 65)
        //    selectedBox.position.x--; //A
        //else if (selectedBox != null && keyCode == 68)
        //    selectedBox.position.x++; //D
        //else if (selectedBox != null && keyCode == 27)
        //    selectedBox = null; //ESC
        //else if (selectedBox != null && keyCode == 104)
        //    selectedBox.position.y += 20; //W
        //else if (selectedBox != null && keyCode == 98)
        //    selectedBox.position.y -= 20; //2
        //else if (selectedBox != null && keyCode == 100)
        //    selectedBox.position.x -= 20; //4
        //else if (selectedBox != null && keyCode == 102)
        //    selectedBox.position.x += 20; //6
        //else if (selectedBox != null && keyCode == 103)
        //    selectedBox.position.z -= 20; //9 --
        //else if (selectedBox != null && keyCode == 105)
        //    selectedBox.position.z += 20; //7 ++
        //camera.lookAt(cameraLookAtPoint);



    }

    

    function onMouseDown(event) {
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) selectedBox = intersects[0].object;
    }

}
