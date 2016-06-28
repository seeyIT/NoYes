Image.prototype.MoveDown = function () {
    var dis = this;
    f();
    function f() {
        if (gameIsPlaying) {
            dis.style.top = parseInt(dis.style.top) + 1;
            if (parseInt(dis.style.top) > 500) {
                {
                    dis.remove();
                    return;

                }
            }
            //console.log(scrollingSpeed)
        }

        setTimeout(f, scrollingSpeed);

    }
    
}

Image.prototype.PlayerCollision = function () {
    PlayerCollisions();
    function PlayerCollisions() {
        var _playerLeft = parseInt(Player.style.left);
        var _playerTop = parseInt(Player.style.top);
        var _playerHeight = parseInt(Player.style.height);
        var _playerWidth = parseInt(Player.style.width);


        var l1 = tableWithBackgorund.length;
        for (var i = l1 - 35 > 0 ? l1 - 35 : 0; i < l1; i++) {
            if (parseInt(tableWithBackgorund[i].style.left) + parseInt(tableWithBackgorund[i].style.width) >= _playerLeft &&
            parseInt(tableWithBackgorund[i].style.left) <= _playerLeft + _playerWidth &&
            parseInt(tableWithBackgorund[i].style.top) + parseInt(tableWithBackgorund[i].style.height) >= _playerTop &&
            parseInt(tableWithBackgorund[i].style.top) <= _playerTop + _playerHeight) {
                PlayerDestroy();
                return;
            }
        }

        var l2 = tableWithEnemy.length;
       

        for (var i = l2 - 15 > 0 ? l2 - 15 : 0; i < l2; i++) {
            if (parseInt(tableWithEnemy[i].style.left) + parseInt(tableWithEnemy[i].style.width) >= _playerLeft &&
            parseInt(tableWithEnemy[i].style.left) <= _playerLeft + _playerWidth &&
            parseInt(tableWithEnemy[i].style.top) + parseInt(tableWithEnemy[i].style.height) >= _playerTop &&
            parseInt(tableWithEnemy[i].style.top) <= _playerTop + _playerHeight) {
                PlayerDestroy();
                return;
            }
        }

        var l = tableWithFuel.length;
        for (var i = 0; i < l; i++) {
            
            if (parseInt(tableWithFuel[i].style.left) + parseInt(tableWithFuel[i].style.width) >= _playerLeft &&
            parseInt(tableWithFuel[i].style.left) <= _playerLeft + _playerWidth &&
            parseInt(tableWithFuel[i].style.top) + parseInt(tableWithFuel[i].style.height) >= _playerTop &&
            parseInt(tableWithFuel[i].style.top) <= _playerTop + _playerHeight) {
                setTimeout(AddFuel, 50)
                if (tableWithFuel[i].full == true) {
                    tableWithFuel[i].full = false;
                    audio.src = "sound/fuel.mp3";
                    audio.play();
                    setTimeout(function () {
                        if (audio.src == "file:///D:/szkola/ClearJS/DD/ddproject/sound/fuel.mp3" && gameIsPlaying) {
                            audio.src = currentTrack;
                            audio.play();
                        }
                    },600)
                }
                
            }
        }


        setTimeout(PlayerCollisions, 30);
    }
}

Image.prototype.Shoot = function () {
    var dis = this;
    f();
    function f() {
            if (gameIsPlaying) {
                if (parseInt(dis.style.top) < 0) {
                    dis.remove();
                    enableToShoot = true;
                    return;
                }

                dis.style.left = parseInt(Player.style.left) + parseInt(Player.style.width) / 2;

                ShotCollisionWithGround(dis);

                var _topShot, _leftShot, _topSth, _leftSth;
                _topShot = parseInt(dis.style.top);
                _leftShot = parseInt(dis.style.left);
                _widthShot = parseInt(dis.style.width);
                _heigthShot = parseInt(dis.style.height);

                //bridge collison, destory
                try {
                    if (_leftShot >= parseInt(bridgeToDestroy.style.left) &&
                        _leftShot + _widthShot <=
                        parseInt(bridgeToDestroy.style.left) + parseInt(bridgeToDestroy.style.width) &&
                        _topShot <= parseInt(bridgeToDestroy.style.top) + parseInt(bridgeToDestroy.style.height) &&
                        _topShot >= parseInt(bridgeToDestroy.style.top)) {

                        DestroyAnimation(bridgeToDestroy);
                        var _index = tableWithBackgorund.indexOf(bridgeToDestroy);
                        tableWithBackgorund.splice(_index, 1);
                        bridgeToDestroy.exist = false;
                        bridgeToDestroy.remove();

                        bridgeToDestroy = null;
                        dis.remove();
                        enableToShoot = true;
                        localStorage.setItem("bridgeCounter", parseInt(localStorage.getItem("bridgeCounter")) + 1);
                        return;
                    }
                } catch (e) {

                }

                for (var i = 0; i < tableWithFuel.length; i++) {

                    _topSth = parseInt(tableWithFuel[i].style.top);
                    _leftSth = parseInt(tableWithFuel[i].style.left)
                    _widthSth = parseInt(tableWithFuel[i].style.width);
                    _heigthSth = parseInt(tableWithFuel[i].style.height);


                    if (_leftShot >= _leftSth &&
                        _leftShot + _widthShot <= _leftSth + _widthSth &&
                        _topShot <= _topSth + _heigthSth &&
                        _topShot >= _topSth) {
                        DestroyAnimation(tableWithFuel[i]);
                        tableWithFuel[i].remove();
                        var _index = tableWithFuel.indexOf(tableWithFuel[i]);
                        tableWithFuel.splice(_index, 1);

                        score += 130;

                        dis.remove();
                        enableToShoot = true;
                        return;
                    }
                }
                for (var i = 0; i < tableWithEnemy.length; i++) {

                    _topSth = parseInt(tableWithEnemy[i].style.top);
                    _leftSth = parseInt(tableWithEnemy[i].style.left)
                    _widthSth = parseInt(tableWithEnemy[i].style.width);
                    _heigthSth = parseInt(tableWithEnemy[i].style.height);


                    if (_leftShot >= _leftSth &&
                        _leftShot + _widthShot <= _leftSth + _widthSth &&
                        _topShot <= _topSth + _heigthSth &&
                        _topShot >= _topSth) {
                        DestroyAnimation(tableWithEnemy[i]);
                        tableWithEnemy[i].live =false;
                        tableWithEnemy[i].remove();
                        var _index = tableWithEnemy.indexOf(tableWithEnemy[i]);
                        tableWithEnemy.splice(_index, 1);

                        score += 50;

                        dis.remove();
                        enableToShoot = true;
                        return;
                    }

                }
                dis.style.top = parseInt(dis.style.top) - 10;
            }


            setTimeout(f, bulletSpeed);

        }


    setTimeout(function() {
        // niszczenie jak zatrzyma sie 
        if (parseInt(dis.style.top) == 430) {
                
                dis.remove();
                return;
            }


        },
        50);
}

Image.prototype.HelicopterShoot = function() {
    var dis = this;
    f();

    function f() {
        if (!dis.live)
            return;

        var img = new Image();
        img.src = "img/shoot.png";
        img.style.width = 6;
        img.style.height = 2;

        img.style.position = "absolute";
        img.style.top = parseInt(dis.style.top) + parseInt(dis.style.height) / 2;
        if (dis.direction == "L") {
            img.style.left = parseInt(dis.style.left) - 10;
        }
        else if (dis.direction == "R") {
            img.style.left = parseInt(dis.style.left) + parseInt(dis.style.width) + 10;
        }
        img.MoveDown();
        
            

        img.HelicopterBullet(dis.direction);
        playField.appendChild(img);

        

        setTimeout(f, 3000);
    }
}

Image.prototype.HelicopterBullet = function (direction) {
    var dis = this;
    f();
   
    function f() {
        if (direction == "L") {
            dis.style.left = parseInt(dis.style.left) - 2;
        }
        else if (direction == "R") {
            dis.style.left = parseInt(dis.style.left) + 2;
        }
        ShotCollisionWithGround(dis);
        ShotCollisonWtihPlayer(dis);
        setTimeout(f, 30);
    }
   
}

Image.prototype.BridgeTankBullet = function () {

    var dis = this;
    f();
    
    function f() {
       console.log(3);
       dis.style.left = parseInt(dis.style.left) + 10;
        
        //ShotCollisionWithGround(self);
       ShotCollisonWtihPlayer(dis);
       if (parseInt(dis.style.left) > 500) {
           dis.remove()
            return;
        }
        setTimeout(f, 30);
    }
}

Image.prototype.HelicopterFly = function () {
    var dis = this;
    f();
    
    
    //file:///D:/szkola/ClearJS/DD/ddproject/img/HelicopterL.png
    function f()
    {

        if (dis.src == "file:///D:/szkola/ClearJS/DD/ddproject/img/HelicopterL.png") {
            dis.src = "file:///D:/szkola/ClearJS/DD/ddproject/img/Helicopter2L.png";
        }
        else if (dis.src == "file:///D:/szkola/ClearJS/DD/ddproject/img/Helicopter2L.png") {
            dis.src = "file:///D:/szkola/ClearJS/DD/ddproject/img/HelicopterL.png";
        }
        else if (dis.src == "file:///D:/szkola/ClearJS/DD/ddproject/img/HelicopterR.png") {
            dis.src = "file:///D:/szkola/ClearJS/DD/ddproject/img/Helicopter2R.png";
        }
        else if (dis.src == "file:///D:/szkola/ClearJS/DD/ddproject/img/Helicopter2R.png") {
            dis.src = "file:///D:/szkola/ClearJS/DD/ddproject/img/HelicopterR.png";
        } else {
            return;
        }
        setTimeout(f, 200);
    }
}

Image.prototype.PlaneHorizontalFly = function() {
    var dis = this;
    f();
    function f()
    {
        
        if (parseInt(dis.style.left) < 0) {
            dis.remove();
            return;
        }
        var left = parseInt(dis.style.left);
        dis.style.left = left - 5;
        
        
        setTimeout(f, 30);
    }
}

Image.prototype.TankRaid = function () {
    var dis = this;
    f();
    
    var iterator = 0;
    function f() {

        iterator++;
        if (iterator > 30) {
            dis.src = "file:///D:/szkola/ClearJS/DD/ddproject/img/tank3.png";
            return;

        }
        if (dis.src == "file:///D:/szkola/ClearJS/DD/ddproject/img/tank1.png") {
            dis.src = "file:///D:/szkola/ClearJS/DD/ddproject/img/tank2.png";
        }
        else if (dis.src == "file:///D:/szkola/ClearJS/DD/ddproject/img/tank2.png") {
            dis.src = "file:///D:/szkola/ClearJS/DD/ddproject/img/tank1.png";
        } else {
            return;
        }
        setTimeout(f, 50);
    }
}

Image.prototype.BackAndForth = function () {
    var dis = this;
    f();
    function f() {
       
        if (dis.direction == "L")
            dis.style.left = parseInt(dis.style.left) - 2;
        else if (dis.direction == "R") {
            dis.style.left = parseInt(dis.style.left) + 2;
        } else {
            return;
        }
        var length = tableWithBackgorund.length;
        for (var i = length - 30 > 0 ? length - 30 : 0; i < length; i++) {
            if (parseInt(tableWithBackgorund[i].style.left) + parseInt(tableWithBackgorund[i].style.width) >= parseInt(dis.style.left) &&
            parseInt(tableWithBackgorund[i].style.left) <= parseInt(dis.style.left) + parseInt(dis.style.width) &&
            parseInt(tableWithBackgorund[i].style.top) + parseInt(tableWithBackgorund[i].style.height) >= parseInt(dis.style.top) &&
            parseInt(tableWithBackgorund[i].style.top) <= parseInt(dis.style.top) + parseInt(dis.style.height)) {
                if (dis.direction == "L") {
                    dis.direction = "R";
                    dis.src = dis.src.substr(0, dis.src.length - 5) + "R.png";
                }

                else {
                    dis.direction = "L";
                    dis.src = dis.src.substr(0, dis.src.length - 5) + "L.png";
                }
                break;
            }
        }
        
        

        setTimeout(f, 80);
    }

}

Image.prototype.SpawnHouses = function () {
    var dis = this;

    var img = new Image();
    img.src = "img/GrassWithTank.png";
    img.style.position = "absolute";
    var rand = Math.random() * 10;
    if (rand > 6) {
        img.style.left = Math.random() * (500 - parseInt(dis.style.left) - 60) + "px";
    } else {
        img.style.left = parseInt(dis.style.left) + Math.random() * 100 + "px";
    }

    img.style.top = parseInt(dis.style.top) - parseInt(Math.random() * 30 + 10) + "px";
    img.style.width = 60 + "px";
    img.style.height = 60 + "px";
    img.style.zIndex = 6;
    if (parseInt(img.style.left) + parseInt(img.style.width) >= 500)
        return;
    img.MoveDown();
    playField.appendChild(img);
}

Image.prototype.NormalTankMove = function() {
    var dis = this;
    var iterator = 0;
    f();
    function f() {
        iterator++;
        if (iterator > 30) {
            var shotDistance = parseInt(Math.random() * 20 + 20);
            TankShot(dis, shotDistance);
            return;

        }
        dis.style.left = (parseInt(dis.style.left) - 3) + "px";
        if (parseInt(dis.style.left) + parseInt(dis.style.width) <= 500)
            dis.style.display = "block";
        setTimeout(f, 50);
    }
}




