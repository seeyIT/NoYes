function DestroyAnimation(object) {

    var animation = new Image();
    animation.src = "img/BigExplosion1.png";
    animation.style.width = object.style.width;
    animation.style.height = object.style.height;
    animation.style.position = object.style.position;
    animation.style.top = object.style.top;
    animation.style.left = object.style.left;
    animation.MoveDown();
    playField.appendChild(animation);

    setTimeout(function() {
            animation.src = "img/BigExplosion2.png";
        },
        150);

    setTimeout(function () {
        animation.src = "img/BigExplosion1.png";
        animation.remove();
    }, 300)

    audioDestroy.src = "sound/destroy.mp3";
    audioDestroy.play();
   
    

}

function PlayerMovementHorizontal() {
    if (rightMove) {
        Player.style.left = parseInt(Player.style.left) + 1;
        Player.src = "img/Right.png";
    }
    if (leftMove) {
        Player.style.left = parseInt(Player.style.left) - 1;
        Player.src = "img/Left.png";

    }
}

function FuelLevel() {
    var fuelPoint = document.getElementById("FuelPoint");
    setTimeout(f, 1500)
    function f() {
        if (gameIsPlaying)
        {

            fuelLevel -= 5;
            
            if(fuelLevel>155)
                fuelLevel=155;

            fuelPoint.style.left = fuelLevel + 20 + "px"; // 20 to odleglosc do minmun
            if (fuelLevel < 0) {
               // gameIsPlaying = false;
               // buttonEnable = false;
               // Player.remove();
               // DestroyAnimation(Player);
               // PlayerDestroy();
                return;
            }
        }
        
        setTimeout(f, scrollingSpeed*50) // szybkosc spadania paliwa w zaleznosci od scrollingu
    }

}

function AddFuel()
{
    f();
    var iterator = 0 ;
    function f()
    {
       // iterator++;
        //if(iterator>2)
           //{ return;}

        if(fuelLevel>155)
            return;

        fuelLevel +=3;
        //setTimeout(f,80);
    }
}

function CountScore()
{
    var PointsContainer = document.getElementById("PointsContainer");

    score = localStorage.getItem("points");

    f();
    function f() {
       
            PointsContainer.innerHTML = "";
            score = score.toString();
            var scoreL = score.length;
            for (var i = scoreL - 1; i >= 0; i--) {
                var tempImg = new Image();
                var tempNum = parseInt(score[i]);

                tempImg.src = tableWithPoints[tempNum];
                tempImg.style.position = "relative";
                tempImg.style.top = 10 + "px";
                tempImg.style.width = 20 + "px";
                tempImg.style.height = 15 + "px";

                tempImg.style.right = (-175 + ((scoreL - 1 - i) * 45)) + "px";
                PointsContainer.appendChild(tempImg);
            }
            score = parseInt(score);
            localStorage.setItem("points",score);
        



        setTimeout(f, 100);
    }

}

function CountLive() {
    var LiveContainer = document.getElementById("LiveContainer");

    lives--;

    if (lives < 0) {
        console.log("gg");
        return;
    }
    LiveContainer.innerHTML = "";

    var tempImg = new Image();
    tempImg.src = tableWithPoints[lives];
    tempImg.style.width = 20 + "px";
    tempImg.style.height = 20 + "px";
    tempImg.style.position = "relative";
    tempImg.style.left = 5 + "px";
    tempImg.style.top = 5 + "px";

    LiveContainer.appendChild(tempImg);

}

function ActivisionAnim() {
    var activisionContainer = document.getElementById("ActivisionContainer");

    var tempImg = new Image();
    tempImg.src = "img/ActiVision.png";
    tempImg.style.width = 150 + "px";
    tempImg.style.height = 20 + "px";
    tempImg.style.position = "relative";
    tempImg.style.left = 20 + "px";
    tempImg.style.top = 5 + "px";
    
    activisionContainer.appendChild(tempImg);

}

function PlayerDestroy()
{
    gameIsPlaying = false;
    buttonEnable = false;
    Player.remove();
    DestroyAnimation(Player);
    audio.src = "";
    try {
        audio.remove();
        Player.remove();
        Player.style.width = 1;
        Player.style.height = 1;
        Player.style.top = 1;
        Player.style.left = 1;
        var children = playField.children;
        
        for (var i = 0; i < children.length; i++) {
            if (parseInt(children[i].style.width) == 2) {
                children[i].remove();
            }
        }
    }
    catch(e)
    {
        ;
    }
    
    //localStorage.setItem("bridgeCounter", bridgeCounter);
    //localStorage.setItem("bridgeToSpawn", bridgeToSpawn);



    setTimeout(function () {
        localStorage.setItem("lives", localStorage.getItem("lives") - 1);
        if (localStorage.getItem("lives") <= 0)
            return;
        location.reload();
        //playField.innerHTML = "";
        //gameIsPlaying = true;
        //AnimStart();
    }, 1000);
}

function Scrolling(self) {
    self.style.top = parseInt(self.style.top) + 1;
}

function ShootFly(e) {
    
}

function PressKey(e) {
   
    //console.log(e.which)

    if (e.which == 119) {
        if (audio.src != "file:///D:/szkola/ClearJS/DD/ddproject/sound/moveFast.mp3" && gameIsPlaying==true) {
            audio.src = "sound/moveFast.mp3";
            currentTrack = "sound/moveFast.mp3";
            audio.play();
        }
        if (scrollingSpeed > 5) {
            setTimeout(function() {
                    scrollingSpeed -= 1;
                },
                10);
            
            return;
        }

        return;
    }
    else if (e.which == 115  ) {
        if (audio.src != "file:///D:/szkola/ClearJS/DD/ddproject/sound/moveSlow.mp3" && gameIsPlaying ==true) {
            audio.src = "sound/moveSlow.mp3";
            currentTrack = "sound/moveSlow.mp3";
            audio.play();
        }
        if (scrollingSpeed < 40) {
            setTimeout(function() {
                    scrollingSpeed += 1;
                },
                10);
            
            return;
        }
        return;
    }

    else if (e.which == 122 ) {
        if (!ableToStartFly)
            return;
        audio.src = "sound/moveNormal.mp3";
        currentTrack = "sound/moveNormal.mp3";
        audio.play();
        ableToStartFly = false;
        gameIsPlaying = true;
        FuelLevel();
        buttonEnable = true;
        //SpanwPlanes();
    }
    else if (e.which == 112) {
        
        localStorage.setItem("lives", 4);
        localStorage.setItem("points", 0);
        localStorage.setItem("bridgeCounter", 0);
        localStorage.setItem("bridgeToSpawn", 0);
        location.reload();
    }
    if (!buttonEnable)
        return;

        
        if (e.which == 100) {
            rightMove = true;
            leftMove = false;

            Player.style.width = 15;
        }
        else if (e.which == 97) {
            leftMove = true;
            rightMove = false;

            Player.style.width = 15;
        }

        else if (e.which == 32 && enableToShoot) {

            enableToShoot = false;
            var shoot = new Image();
            shoot.src = "img/shoot.png";
            shoot.style.position = "absolute";
            shoot.style.width = 2;
            shoot.style.height = 6;
            shoot.style.top = parseInt(Player.style.top) - 20;
                
            shoot.Shoot();
            playField.appendChild(shoot);

            audioShot.src = "sound/shot.mp3";
            audioShot.play();
            
        }
 }
            
function KeyUp(e) {
    if (!buttonEnable)
        return;

    if ((e.which == 87 || e.which == 83) && gameIsPlaying) {
        scrollingSpeed = 20;
        audio.src = "sound/moveNormal.mp3";
        audio.play();
    }
    if (e.which == 68) {
        Player.src = "img/Forward.png";
        rightMove = false;
        Player.style.width = 20;
    }
    else if (e.which == 65) {
        Player.src = "img/Forward.png";
        leftMove = false;
        Player.style.width = 20;
    }
}

function ShotCollisionWithGround(self)
{
    var length = tableWithBackgorund.length;
    for (var i = length - 50 > 0 ? length - 50 : 0; i < length; i++) {
        if (parseInt(tableWithBackgorund[i].style.left) + parseInt(tableWithBackgorund[i].style.width) >=
            parseInt(self.style.left) &&
            parseInt(tableWithBackgorund[i].style.left) <= parseInt(self.style.left) + parseInt(self.style.width) &&
            parseInt(tableWithBackgorund[i].style.top) + parseInt(tableWithBackgorund[i].style.height) >=
            parseInt(self.style.top) &&
            parseInt(tableWithBackgorund[i].style.top) <= parseInt(self.style.top) + parseInt(self.style.height)) {
            self.remove();
            return;
        }
    }
}

function SpawnBackground() {
    var iterator = 0;
    f();
    
    function f() {

        if (gameIsPlaying) {

            var bridgeToSpawn = localStorage.getItem("bridgeToSpawn");
            var imgL = new Image();
            var imgR = new Image();

            imgL.src = "img/Grass.png";
            imgR.src = "img/Grass.png";

            imgL.style.position = "absolute";
            imgR.style.position = "absolute";
            imgL.style.width = tableWithMap[bridgeToSpawn][iterator];
            imgR.style.width = tableWithMap[bridgeToSpawn][iterator];

            iterator++;
            imgL.style.left = 0;
            //imgR.style.right = 0;
            imgR.style.left = 500 - parseInt(imgR.style.width);


            imgL.style.top = -90;
            imgR.style.top = -90;

            imgL.style.height = 100;
            imgR.style.height =100;


            imgL.style.zIndex = 4;
            imgR.style.zIndex = 5;

            
            if (parseInt(imgL.style.width) < 90) {
                var imgM = new Image();
                imgM.src = "img/Grass.png";
                imgM.style.position = "absolute";
                imgM.style.left = 250 - parseInt(imgL.style.width);
                imgM.style.top = -90;
                imgM.style.height = 100;
                //imgM.style.opacity = 0.5;
                imgM.style.width = parseInt(imgL.style.width)*2;
                imgM.style.zIndex = 4;
                tableWithBackgorund.push(imgM);
                imgM.MoveDown();
                playField.appendChild(imgM);
            }

            //imgL.style.zIndex = -1;
            //imgR.style.zIndex = -1;

            tableWithBackgorund.push(imgL);
            tableWithBackgorund.push(imgR);

            imgL.MoveDown();
            imgR.MoveDown();

            playField.appendChild(imgL);
            playField.appendChild(imgR);

            if (iterator % 2 == 0) {
                //console.log(iterator/10);
                SpawnEnemies(iterator / 2);
            }
            if (iterator % 6 == 0) {
                //console.log(iterator/10);
                SpawnFuels(iterator / 6);
                imgR.SpawnHouses();
            }
            if (iterator % 24 == 0) {
                SpawnTanksNormal(parseInt(imgR.style.left));
            }

            if (iterator <= tableWithMap[bridgeToSpawn].length) {
                setTimeout(f, scrollingSpeed * 40);

            }
            else {

                var imgB = new Image();
                imgB.src = "img/RoadToDestory.png";
                imgB.style.position = "absolute";
                imgB.style.width = 200;
                imgB.style.left = 150;
                imgB.style.top = -40;
                imgB.style.height = 60;
                imgB.style.zIndex = 8;
                tableWithBackgorund.push(imgB);
                bridgeToDestroy = imgB;
                bridgeToDestroy.exist = true;
                imgB.MoveDown();
                playField.appendChild(imgB);

                SpawnTanksBridge(imgB);

                var imgLR = new Image();
                imgLR.src = "img/Road.png";
                imgLR.style.position = "absolute";
                imgLR.style.width = 150;
                imgLR.style.left = 0;
                imgLR.style.top = -40;
                imgLR.style.height = 60;
                imgLR.style.zIndex = 8;
                tableWithBackgorund.push(imgLR);
                imgLR.MoveDown();
                playField.appendChild(imgLR);


                var imgRR = new Image();
                imgRR.src = "img/Road.png";
                imgRR.style.position = "absolute";
                imgRR.style.width = 150;
                imgRR.style.right = 0;
                imgRR.style.top = -40;
                imgRR.style.height = 60;
                imgRR.style.zIndex = 8;
                tableWithBackgorund.push(imgRR);
                imgRR.MoveDown();
                playField.appendChild(imgRR);

                iterator = 0;
                localStorage.setItem("bridgeToSpawn",parseInt(localStorage.getItem("bridgeToSpawn"))+1);
                setTimeout(function () {
                    setTimeout(function () {
                        setTimeout(function () {

                            setTimeout(f, scrollingSpeed * 35);

                        },
                            scrollingSpeed * 10);
                    },
                        scrollingSpeed * 10);
                },
                    scrollingSpeed * 10);


            }
        } else {
            setTimeout(f,100);
        }
       
    }
}



function SpanwPlanes()
{
    f();
    function f()
    {
        if (gameIsPlaying)
        {
            var img = new Image();
            img.src = "img/Plane.png";
            img.style.position = "absolute";
            img.style.left = 490 + "px";
            img.style.width = 30 + "px";
            img.style.height = 20 + "px";
            img.style.zIndex = 11;
            img.style.top = Math.random() * 300 + 100 + "px";
            img.PlaneHorizontalFly();
            playField.appendChild(img);
            img.MoveDown();
            tableWithEnemy.push(img);
        }
        setTimeout(f, 1000);
    }
}

function SpawnPlayer()
{
    Player = new Image();
    Player.src = "img/Forward.png";
    Player.style.position = "absolute";
    Player.setAttribute("id", "Player");
    Player.style.top = 450;
    Player.style.left = 240;
    Player.style.width = 20;
    Player.style.height = 25;
    Player.style.zIndex = 10;
    Player.PlayerCollision();

    playField.appendChild(Player);
    Update();
}

function SpawnEnemies(id) {

         var bridgeCounter = localStorage.getItem("bridgeCounter");
        var index = 3 * parseInt(id);
        var img = new Image();
        img.src = "img/" + tableWithAI[bridgeCounter][index] + ".png";
        img.style.position = "absolute";
        img.style.top = -10;
        img.style.left = tableWithAI[bridgeCounter][index + 1];
        img.style.width = 50;
        img.style.zIndex = 2;
        img.style.height = 20;

        if (tableWithAI[bridgeCounter][index] == "ShipL" || tableWithAI[bridgeCounter][index] == "ShipR") {
            img.style.width = 80;
        }
        else if (tableWithAI[bridgeCounter][index] == "BalloonL" || tableWithAI[bridgeCounter][index] == "BalloonR") {
            img.style.height = 40;
            img.style.width = 40;
        }
        else if (tableWithAI[bridgeCounter][index] == "HelicopterL" ||
            tableWithAI[bridgeCounter][index] == "HelicopterR") {
            var foo = parseInt(Math.random() * 10);
            img.live = true;
            if (foo < 4)
            {
                img.HelicopterShoot();
                
            }
            
        }
            img.direction = tableWithAI[bridgeCounter][index + 2];
        
        try{
            if (parseInt(img.style.left) >= parseInt(bridgeToDestroy.style.left) && parseInt(img.style.left) + parseInt(img.style.width) <= parseInt(bridgeToDestroy.style.left) + parseInt(bridgeToDestroy.style.width) && parseInt(img.style.top) <= parseInt(bridgeToDestroy.style.top) + parseInt(bridgeToDestroy.style.height) && parseInt(img.style.top) >= parseInt(bridgeToDestroy.style.top)) {
                img.remove();
                return;
            }
        }
        catch(e)
        {

        }
        tableWithEnemy.push(img);
        img.MoveDown();
        img.HelicopterFly();
        img.BackAndForth();
        playField.appendChild(img);
   
   
}


function SpawnFuels(id) {

    try {
        
        var bridgeCounter = localStorage.getItem("bridgeCounter");
        var index = parseInt(id) - 1;
        var img = new Image();
        img.src = "img/Fuel.png";
        img.style.position = "absolute";
        img.style.top = -70;
        img.style.left = tableWithFuelPositions[bridgeCounter][index];
        img.style.width = 30;
        img.style.height = 70;
        img.full = true;
        img.style.zIndex = 1;
        tableWithFuel.push(img);
        img.MoveDown();
        playField.appendChild(img);
    } catch (e) {
        
    }
        
    

}

function SpawnHouses(self) {

   

}

function SpawnTanksNormal(right)
{
    
    var img = new Image();
    img.src = "img/tank1.png";
    img.style.position = "absolute";
    img.style.top = -30;
    img.style.left = (right +100) +"px";
    img.style.width = 30;
    img.style.height = 30;
    img.style.zIndex = 7;
    img.style.display = "none";
    img.MoveDown();
    img.TankRaid();
    img.NormalTankMove();

    playField.appendChild(img);
    if (right < 430)
        return;

    var img2 = new Image();
    img2.src = "img/tank1.png";
    img2.style.position = "absolute";
    img2.style.top = -100;
    img2.style.left = (right - 150) + "px";
    img2.style.width = 30;
    img2.style.height = 30;
    img2.style.zIndex = 7;
    img2.style.display = "none";
    img2.MoveDown();
    img2.TankRaid();
    img2.NormalTankMove();

    playField.appendChild(img2);

    var img2 = new Image();
    img2.src = "img/tank1.png";
    img2.style.position = "absolute";
    img2.style.top = -500;
    img2.style.left = (right - 150) + "px";
    img2.style.width = 30;
    img2.style.height = 30;
    img2.style.zIndex = 7;
    img2.style.display = "none";
    img2.MoveDown();
    img2.TankRaid();
    img2.NormalTankMove();

    playField.appendChild(img2);
}

function SpawnTanksBridge(self) {
    var img = new Image();
    img.src = "img/tankR1.png";
    img.style.position = "absolute";
    img.style.left = Math.random() * parseInt(self.style.left) +"px";
    img.style.top = parseInt(self.style.top) - 15 + "px";
    img.style.width = 30 + "px";
    img.style.height = 30 + "px";
    img.style.zIndex = 9;
    img.MoveDown();
    playField.appendChild(img);
    BridgeTankMove(self, img);
    TankBridgeRaid(img);
}

function BridgeTankMove(self,tank) {
   
    f();
    function f() {
        try {
            if (parseInt(tank.style.left) + parseInt(tank.style.width) > 500) {
                tank.style.display = "none";
            }

            if (bridgeToDestroy.exist) {
                tank.style.left = parseInt(tank.style.left) + 4;
                //BridgeTankShot(tank);
                
                setTimeout(f, 50);
            }
        }
        catch (e)
        {
            if (parseInt(tank.style.left) + parseInt(tank.style.width) > 150 &&
                parseInt(tank.style.left) < 350) {
                tank.remove();
                    DestroyAnimation(tank);
                }
            return;
        }
        
    }
}

function BridgeTankShot(self) {
    
    console.log(2)
    var img = new Image();
    img.src = "img/shoot.png";
    img.style.width = 6;
    img.style.height = 2;
    img.style.zIndex = 10;
    img.style.position = "absolute";
    img.style.top = parseInt(self.style.top) + parseInt(self.style.height) / 2;
    img.style.left = parseInt(self.style.left);
        
    img.MoveDown();

    img.BridgeTankBullet();
    playField.appendChild(img);

      
}

function TankShot(self,distance) {
    f();
    function f() {
        
        var img = new Image();
        img.src = "img/shoot.png";
        img.style.position = "absolute";
        img.style.width = 6;
        img.style.height = 2;
        img.style.top = parseInt(self.style.top)+1;
        img.style.left = parseInt(self.style.left) - 10;
        img.style.zIndex = 7;
        img.MoveDown();
        TankShotFly(img, distance);
        playField.appendChild(img);
        
        setTimeout(f, 1000);
    }

}

function TankBridgeRaid(self) {
    f();
    var iterator = 0;

    function f() {

        if (self.src == "file:///D:/szkola/ClearJS/DD/ddproject/img/tankR1.png") {
            self.src = "file:///D:/szkola/ClearJS/DD/ddproject/img/tankR2.png";
        } else if (self.src == "file:///D:/szkola/ClearJS/DD/ddproject/img/tankR2.png") {
            self.src = "file:///D:/szkola/ClearJS/DD/ddproject/img/tankR1.png";
        } else {
            return;
        }
        setTimeout(f, 50);
    }

}

function TankShotFly(self, distance) {
    f();
    var iterator = 0;
    var down = 0;
    function f() {
        iterator++;
        if (iterator > distance) {
            ShotAnimation(self);
            return;
        }
        self.style.left = parseInt(self.style.left) - 3;
        
        if (down ==1) {
            self.style.top = parseInt(self.style.top) + 1 + "px";
        }
        else if (down > 5) {
            down = 0;
        }
        down++;
        ShotCollisonWtihPlayer(self);
        setTimeout(f, 20);
    }


}

function ShotCollisonWtihPlayer(self) {
    if (parseInt(self.style.left) + parseInt(self.style.width) >= parseInt(Player.style.left) &&
        parseInt(self.style.left) <= parseInt(Player.style.left) + parseInt(Player.style.width) &&
        parseInt(self.style.top) + parseInt(self.style.height) >= parseInt(Player.style.top) &&
        parseInt(self.style.top) <= parseInt(Player.style.top) + parseInt(Player.style.height)) {
        PlayerDestroy();
        return;
    }
    
}

function ShotAnimation(self) {

    var img = new Image();
    img.src = "img/exp1.png";
    img.style.left = self.style.left;
    img.style.top = self.style.top;
    img.style.position = "absolute";
    img.style.width = 20 + "px";
    img.style.height = 10 + "px";
    img.MoveDown();
    img.style.zIndex = 7;
    playField.appendChild(img);
    self.remove();

    setTimeout(function () {
        img.src = "img/exp2.png";
        setTimeout(function () {
            img.src = "img/exp3.png";
            setTimeout(function () {
                img.remove();

            },
        200);
        },
        200);
    },
        200);

    
}

function SpawnAdditionalBackground()
{
    var img20 = new Image();
    img20.src = "img/Road.png";
    img20.style.position = "absolute";
    img20.style.top = 10;
    img20.style.left = 0;
    img20.style.width = 150;
    img20.style.height = 60;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Road.png";
    img20.style.position = "absolute";
    img20.style.top = 10;
    img20.style.left = 350;
    img20.style.width = 150;
    img20.style.height = 60;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 70;
    img20.style.left = 0;
    img20.style.width = 150;
    img20.style.height = 100;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 70;
    img20.style.left = 350;
    img20.style.width = 150;
    img20.style.height = 100;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 170;
    img20.style.left = 0;
    img20.style.width = 150;
    img20.style.height = 100;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 170;
    img20.style.left = 350;
    img20.style.width = 150;
    img20.style.height = 100;
    img20.MoveDown();
    playField.appendChild(img20);
    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 270;
    img20.style.left = 0;
    img20.style.width = 150;
    img20.style.height = 100;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 270;
    img20.style.left = 350;
    img20.style.width = 150;
    img20.style.height = 100;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 370;
    img20.style.left = 0;
    img20.style.width = 150;
    img20.style.height = 100;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 370;
    img20.style.left = 350;
    img20.style.width = 150;
    img20.style.height = 100;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 470;
    img20.style.left = 0;
    img20.style.width = 150;
    img20.style.height = 80;
    img20.MoveDown();
    playField.appendChild(img20);

    var img20 = new Image();
    img20.src = "img/Grass.png";
    img20.style.position = "absolute";
    img20.style.top = 470;
    img20.style.left = 350;
    img20.style.width = 150;
    img20.style.height = 80;
    img20.MoveDown();
    playField.appendChild(img20);
}

//function MoveDown(self)
//{
//    f();
//    function f() {
//        if (gameIsPlaying) {
//            self.style.top = parseInt(self.style.top) + 1;
//            if (parseInt(self.style.top) > 500) {
//                {
//                    self.remove();
//                    return;

//                }
//            }
//            //console.log(scrollingSpeed)
//        }

//        setTimeout(f, scrollingSpeed);

//    }
//}