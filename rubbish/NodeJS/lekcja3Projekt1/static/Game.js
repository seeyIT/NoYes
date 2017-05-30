function Game()
{
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
    var renderer = new THREE.WebGLRenderer();

    var selectedBox;
    var box = new THREE.CubeGeometry(30, 7, 30, 1, 1, 1);
    var angle = 0;
    var figures = [];
    var materials = [];
    var tableWithBlackF = [];
    var tableWithWhiteF = [];
    var selectedFigure;
    color = "";//= "white";
    var enableToMove = false;


    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('materials/mat3.png') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('materials/mat3.png') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('materials/mat3.png') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('materials/mat3.png') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('materials/mat3.png') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('materials/mat3.png') }));

    var material = new THREE.MeshFaceMaterial(materials);
    var geometry = new THREE.CubeGeometry(20, 20, 20);

    renderer.setClearColor(0x00ff00);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var blackColorF = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x000000 })
    var blackColorB = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x444444 })
    var whiteColorF = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0xffffff })
    var whiteColorB = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0xbbbbbb })

    var figure = new THREE.CylinderGeometry(10, 10, 4, 32);


    //for (var i = -4; i < 4; i++) {
    //    for (var j = -4; j < 4; j++) {
    //        var mesh = new THREE.Mesh(box, material);
    //        mesh.position.set(20 * j, 7, 20 * i);
    //        //scene.add(mesh);
    //        //figures.push(mesh);
    //    }

    //}

    
    var axis = new THREE.AxisHelper(200);
    scene.add(axis);

    document.getElementById("Board").appendChild(renderer.domElement);
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("mousedown", onMouseDown, false);
    

    camera.position.x = -150;
    camera.position.y = 250;
    camera.position.z = 110;

    var cameraLookAtPoint = new THREE.Vector3(120, 0, 120);
    camera.lookAt(cameraLookAtPoint);

    AnimateScene();


    this.ClearBoard = function()
    {
        for (var fig in figures)
        {
            
            scene.remove(figures[fig]);
        }
        figures = [];
    }

    this.SpawnBoard = function()
    {
        var black = true;
        for (var i = 0; i < 8; i++)
        {
            for(var j =0;j<8;j++)
            {
                if (black)
                {
                    var mesh = new THREE.Mesh(box, whiteColorB);
                    mesh.position.set(30 * i, 0, 30 * j);
                    mesh.name = "enable";
                    
                    scene.add(mesh)
                }
                else
                {
                    var mesh = new THREE.Mesh(box, blackColorB);
                    mesh.position.set(30 * i, 0, 30 * j);
                    mesh.name = "disable";
                    scene.add(mesh)
                }
                black = !black;
            }
            black = !black;
        }
        
    }

    var boardF;
     this.SpawnFigures = function(board)
     {
         
         boardF = board;
         for (var i = 0; i < 8; i++)
         {
             for(var j =0;j<8;j++)
             {
                 
                 
                 if(board[i][j]==1)
                 {
                     var mesh = new THREE.Mesh(figure, whiteColorF);
                     mesh.position.set(30 * i, 7, 30 * j);
                     mesh.name = "white";
                     tableWithWhiteF.push(mesh);
                     figures.push(mesh);
                     scene.add(mesh);
                 }
                 else if(board[i][j]==2)
                 {
                     var mesh = new THREE.Mesh(figure, blackColorF);
                     mesh.position.set(30 * i, 7, 30 * j);
                      tableWithBlackF.push(mesh);

                      mesh.name = "black";
                      figures.push(mesh);
                     scene.add(mesh);
                 }
                 
             }
         }
        //var mesh = new THREE.Mesh(box, material);
        //mesh.position.set(40, 40, 0);
        //scene.add(mesh);


        //var mesh = new THREE.Mesh(box, material);
        //mesh.position.set(-40, 40, 0);
        //scene.add(mesh);
    }
     this.TurnCamera = function()
     {
         camera.position.x = 390;
         camera.lookAt(cameraLookAtPoint);
     }
     

     this.SetColor = function (name)
     {
         color = name;
         
     }
     this.SetMove = function (move) {
         enableToMove = move;
     }

     this.StartChecking =  function ()
     {
         ZacznijSprawdzanie();
     }

     this.CheckMovement = function()
     {
         CzyjRuch();
     }
     this.TakeColor = function()
     {
         return color;
     }

     this.SprawdzaniePlanszy = function()
     {

         Sprawdzanieboard()
         
     }
     function Sprawdzanieboard(){
         net.TakeBoard();

         setTimeout(Sprawdzanieboard, 1000)
     }

     function CzyjRuch()
     {
         net.CheckForMove();
         setTimeout(CzyjRuch, 100);
     }

     function ZacznijSprawdzanie()
     {
         net.CheckForSecond();

         setTimeout(ZacznijSprawdzanie, 100)
     }

     function onMouseDown(event)
     {
         mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
         mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
         raycaster.setFromCamera(mouseVector, camera);
         var intersects = raycaster.intersectObjects(scene.children);
         if (intersects.length > 0) {
             console.log(enableToMove)
             
             if (selectedFigure != null && enableToMove )
             {
                 
                 if(intersects[0].object.name =="enable")
                 {
                     if(selectedFigure.position.distanceTo(intersects[0].object.position) <45)
                     {
                         
                         if (boardF[intersects[0].object.position.x / 30][intersects[0].object.position.z / 30] == 2)
                         {
                             return;
                         }
                             
                         var x = selectedFigure.position.x / 30;
                         var y = selectedFigure.position.z / 30;
                         var nx = intersects[0].object.position.x/30;
                         var ny = intersects[0].object.position.z / 30;

                         console.log(x, y, nx, ny);
                        
                          if (color == "black")
                         {
                                 if(nx==5 && ny==3)
                                 {
                                     
                                     boardF[5][3] = 0;
                                     boardF[6][4] = 0;
                                     boardF[4][2] = 2;
                                     selectedFigure.position.x = 4 * 30;
                                     selectedFigure.position.z = 2 * 30;
                                     net.Send(boardF);
                                     boardF[selectedFigure.position.x / 30][selectedFigure.position.x / 30] = 0;
                                     console.log("usuneo");
                                     return;
                                 }
                                 //nx-1
                         }
                         
                              boardF[selectedFigure.position.x / 30][selectedFigure.position.z / 30] = 0;
                              selectedFigure.position.x = intersects[0].object.position.x;
                              selectedFigure.position.z = intersects[0].object.position.z;
                              enableToMove = false;
                              console.log(color);
                              if (color == "white")
                                  boardF[selectedFigure.position.x / 30][selectedFigure.position.z / 30] = 1;
                              else if (color == "black")
                                  boardF[selectedFigure.position.x / 30][selectedFigure.position.z / 30] = 2;

                              net.Send(boardF);
                          

                        
                     }
                 }
             }
            
             if (intersects[0].object.name == color)
             {
                 selectedFigure = intersects[0].object;
                 
                 console.log(selectedFigure);
             }
            
         }


     }

    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany bedzie do określenie pozycji myszy na ekranie

    function AnimateScene() {

        requestAnimationFrame(AnimateScene);
        renderer.render(scene, camera);
    }

    function onKeyDown(event) {
        var keyCode = event.which; 
        if (keyCode == 40) {
            camera.position.y--;
        }
        else if (keyCode == 38) {
            camera.position.y++;

        }
        else if (keyCode == 39) {
            camera.position.x = Math.cos(angle / 90) * 100; // w prawo
            camera.position.z = Math.sin(angle / 90) * 100;
            angle--;

        }
        else if (keyCode == 37) {
            camera.position.x = Math.cos(angle / 90) * 100; // w lewo
            camera.position.z = Math.sin(angle / 90) * 100;
            angle++;

        }
        else if (selectedBox != null && keyCode == 87)
            selectedBox.position.y++; //W
        else if (selectedBox != null && keyCode == 83)
            selectedBox.position.y--; //S
        else if (selectedBox != null && keyCode == 65)
            selectedBox.position.x--; //A
        else if (selectedBox != null && keyCode == 68)
            selectedBox.position.x++; //D
        else if (selectedBox != null && keyCode == 27)
            selectedBox = null; //ESC
        else if (selectedBox != null && keyCode == 104)
            selectedBox.position.y += 20; //W
        else if (selectedBox != null && keyCode == 98)
            selectedBox.position.y -= 20; //2
        else if (selectedBox != null && keyCode == 100)
            selectedBox.position.x -= 20; //4
        else if (selectedBox != null && keyCode == 102)
            selectedBox.position.x += 20; //6
        else if (selectedBox != null && keyCode == 103)
            selectedBox.position.z -= 20; //9 --
        else if (selectedBox != null && keyCode == 105)
            selectedBox.position.z += 20; //7 ++
        camera.lookAt(cameraLookAtPoint);
    }



}