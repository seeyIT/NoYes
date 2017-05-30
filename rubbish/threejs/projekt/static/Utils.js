function keyboardIlluminate(x, z) {
    if (!canMakeMove)
        return;
    //try {
    var _cardColor = playFieldTable[z][x].children[1].material.color;
    _cardColor.setHex(0x0000ff);
    // }
    //catch (e){}

}

function resetKeyboardIlluminate(x, z) {
    //try {
    if (playFieldTable[z][x].children[1] != currentElement)
        playFieldTable[z][x].children[1].material.color.setHex(0xffffff);
    // }
    //catch (e){}
}

function getEmptyField() { // ustawienie pierwszego wolnego pola od lewej gornej strony po zmianie zawodnika
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 6; j++) {
            if (playFieldTable[i][j] != 0) {
                startPositionX = j;
                startPositionZ = i;

                keyboardIlluminate(j, i);

                return;
            }
        }
        if (i == 4) {
            finishGame();
        }
    }
}

function finishGame() {

    alert("koniec");
    alert("emit :)");
    //EMIT jakis ??
    resetStatistics();

}

function enterClick(x, z) {
    if (!canMakeMove)
        return;


    var _parent = playFieldTable[z][x];



    var _card;
    for (var child in _parent.children) {
        if (_parent.children[child].type === "Mesh")
            _card = _parent.children[child];
    }
    _card.clicked = true;
    _card.material.color.setHex(0xffffff)
    if (!_parent.showed)
        cardClick(_parent);
}

function startTimer() {
    return;
    //var _timer = document.createElement("div");
    //document.body.appendChild(_timer);
    var _timer = document.createElement("div");
    document.body.appendChild(_timer)

    var _time = 10;
    _timer.style.width = "100px";
    _timer.style.height = "30px";
    _timer.style.backgroundColor = "red";
    _timer.style.position = "absolute";
    _timer.style.left = "0px";
    _timer.style.top = "600px";

    _timer.innerHTML = _time;

    (function f() {
        _time -= 0.5;
        _timer.innerHTML = _time;
        if (_time > 0)
            setTimeout(f, 500);
        else {
            if (!isCheckingCards) {
                //TODO emit powracajacy to pole u drugiego

                loseTurn(firstCard.name);
                resetKeyboardIlluminate(startPositionX, startPositionZ);
                resetStatistics();
            }
        }
    })();


}

function loseTurn(cardName) {
    console.log("tura stracona");

    var _field = scene.getObjectByName(cardName);

    if (!_field.showed)
        return;

    _field.showed = false;

    var _children = _field.children;
    var _light;
    var _card;
    var _model;
    for (var child in _children) {

        if (_children[child].type == "PointLight")
            _light = _children[child];
        else if (_children[child].type == "Mesh")
            _card = _children[child];
        else if (_children[child].type == "Group")
            _model = _children[child];
    }

    _model.position.set(0, -100, 0);
    _model.visible = false;

    _card.material.color.setHex(0xffffff);
    _light.color.setHex(0xff00ff);

}

function changeTurn() {
    //TODO emit zmiant gracza
}

function clearBoard() {
    var _children = scene.children;
    for (var child in _children) {
        scene.remove(_children[child]);
    }
}

function cardClick(parentObject) {

    parentObject.showed = true;

    if (firstCard !== null) { // przy drugim kliknieciu
        canMakeMove = false;
        isCheckingCards = true; // jakby kliknał w ostatniej chwili to zeby nie stracil tury
        resetKeyboardIlluminate(startPositionX, startPositionZ);
    }
    else {
        firstCard = parentObject;
    }
    //TODO emit klikniety obiekt, przekazac tylko uuid parenta i wywolujemy cardClick -> animationCArd 
    //emit.
    

    //stara wersja
    //animationCard(parentObject.uuid);
    //if (!canMakeMove && parentObject !== firstCard)
    //    checkMove(firstCard, parentObject);


    animationCard(parentObject.name, function () {
        //TODO Ewenatulanie obic w timeouta jak za szybko zmienia kolor;
        if (!canMakeMove && parentObject !== firstCard)
            checkMove(firstCard, parentObject);
    });


}

function animationCard(parentObjectName, callback) {

    var parentObject = scene.getObjectByName(parentObjectName);

    var _children = parentObject.children;

    var _light;// = parentObject.children[0]; // alternatywna opcja ale
    var _card;// = parentObject.children[1]; // moze cos sie zepsuc i 
    var _model;// = parentObject.children[2]; //zaladowac w innej kolejnosci

    for (var child in _children) {

        if (_children[child].type == "PointLight")
            _light = _children[child];
        else if (_children[child].type == "Mesh")
            _card = _children[child];
        else if (_children[child].type == "Group")
            _model = _children[child];
    }

    //_model.scale = new THREE.Vector3(0, 0, 0);
    _light.color.setHex("0xffffff");

    var _height = 0;
    (function f() {

        _card.position.y -= 10;
        _light.position.y -= 5;

        _height++;

        if (_height < 10)
            setTimeout(f, 50);
        else {
            //_model.scale = new THREE.Vector3(1, 1, 1);
            _model.visible = true;

            g();
        }

    })();

    function g() {

        _card.position.y += 10;
        _model.position.y += 10;
        _light.position.y += 5;

        _height--;

        if (_height > 0)
            setTimeout(g, 50);
        else
            callback();
    }
}

function checkMove(firstCard, secondCard) {
    

    if (firstCard.uuid === secondCard.uuid) {
        //TODO  EMIT SUKCESU

        successExposure(firstCard.name, secondCard.name);
        resetStatistics();
        canMakeMove = true;
        getEmptyField();
        startTimer();
        getEmptyField();
    }
    else {
        //TODO  EMIT FAILA
        failExposure(firstCard.name, secondCard.name);
        
        resetStatistics();
        changeTurn();
    }
}

function successExposure(firstCardName, secondCardName) {
    var firstCard = scene.getObjectByName(firstCardName);
    var secondCard = scene.getObjectByName(secondCardName);
    //druga osoba bierze emita i szuka tego obiektu po name
    //potem wysyla caly obiekt do tej funkcji
    // dlatego nie mozna zrobic samego swiatla tutaj
    //w timeoucie bedzie odniesienie do innych czesci calego pola

    var _lightOne;
    var _lightTwo;

    for (var child in firstCard.children) {
        if (firstCard.children[child].type == "PointLight")
            _lightOne = firstCard.children[child];
    }
    for (var child in secondCard.children) {
        if (secondCard.children[child].type == "PointLight")
            _lightTwo = secondCard.children[child];
    }

    _lightOne.color.setHex("0x00ff00");
    _lightTwo.color.setHex("0x00ff00");

    var _x = (_lightOne.parent.position.x + 375) / 150;
    var _z = (_lightOne.parent.position.z + 300) / 150;
    playFieldTable[_z][_x] = 0;
    var _x = (_lightTwo.parent.position.x + 375) / 150;
    var _z = (_lightTwo.parent.position.z + 300) / 150;
    playFieldTable[_z][_x] = 0;

    setTimeout(function () {
        console.log("SUKCES");
        removeCards(firstCard, secondCard);
    },
        1000);

}

function removeCards(firstCard, secondCard) {

    firstCard.visible = false;
    secondCard.visible = false;


}

function resetStatistics() {
    firstCard = null;
    canMakeMove = false; // ustawiamt to po zmianie na emicie
    currentElement = null;
    isCheckingCards = false;
}

function failExposure(firstCardName, secondCardName) {

    var firstCard = scene.getObjectByName(firstCardName);
    var secondCard = scene.getObjectByName(secondCardName);
    //exposureColor(firstCard, secondCard, "00ff00")

    var _lightOne;
    var _lightTwo;
    var _cardOne;
    var _cardTwo;
    var _modelOne;
    var _modelTwo;

    for (var child in firstCard.children) {
        if (firstCard.children[child].type == "PointLight")
            _lightOne = firstCard.children[child];
        else if (firstCard.children[child].type == "Mesh")
            _cardOne = firstCard.children[child];
        else if (firstCard.children[child].type == "Group")
            _modelOne = firstCard.children[child];
    }
    for (var child in secondCard.children) {
        if (secondCard.children[child].type == "PointLight")
            _lightTwo = secondCard.children[child];
        else if (secondCard.children[child].type == "Mesh")
            _cardTwo = secondCard.children[child];
        else if (secondCard.children[child].type == "Group")
            _modelTwo = secondCard.children[child];
    }

    _lightOne.color.setHex(0xff0000);
    _lightTwo.color.setHex(0xff0000);

    setTimeout(function () {

        firstCard.showed = false;
        secondCard.showed = false;

        _cardOne.material.color.setHex(0xffffff);
        _cardTwo.material.color.setHex(0xffffff);

        _lightOne.color.setHex(0xffffff);
        _lightTwo.color.setHex(0xffffff);

       

        _modelOne.position.set(0, -100, 0);
        _modelOne.visible = false;

        _modelTwo.position.set(0, -100, 0);
        _modelTwo.visible = false;



    }, 1000)

}