﻿function onMouseMove(event) {
    if (!memo.canMakeMove)
        return;
    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();

    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseVector, memo.camera);
    var intersects = raycaster.intersectObjects(memo.scene.children, true);


    if (intersects.length > 0 && intersects[0].object.type === "Mesh" && !intersects[0].object.clicked && intersects[0].object.card) {
        if (intersects[0].object != memo.currentElement) {
            if (memo.currentElement != null)
                memo.currentElement.material.color.setHex(0xffffff);

            memo.currentElement = intersects[0].object;

            memo.currentElement.colorBefore = intersects[0].object.material.color.getHex().toString(16);


            intersects[0].object.material.color.setHex(0x0ff0ff);
            memo.currentElement = intersects[0].object;
        }
    }
    else if (memo.currentElement != null) {
        memo.currentElement.material.color.setHex("0x" + memo.currentElement.colorBefore); // wyjscie
        memo.currentElement = null;
    }
}

function onMouseDown(event) {
    if (!memo.canMakeMove)
        return;
    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();

    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseVector, memo.camera);
    var intersects = raycaster.intersectObjects(memo.scene.children, true);

    if (intersects.length > 0) {

        if (intersects[0].object.card) {
            intersects[0].object.material.color.setHex(0xffffff);//przywrocenie do starego koloru

            intersects[0].object.clicked = true;
            var objectClicked = memo.scene.getObjectByName(intersects[0].object.uuid, true);
            if (!objectClicked.showed)
                cardClick(objectClicked);


        }
    }



}

function onKeyDown(event) {
    var _key = event.which;
    //console.log(_key);
    console.log(startPositionZ, startPositionX);
    //65 a
    //68 d
    //87 w
    //83 s

    if (_key == 68) { // d
        resetKeyboardIlluminate(startPositionX, startPositionZ);

        startPositionX++;
        //if (startPositionX > 5)
        //    startPositionX = 0;


        while (playFieldTable[startPositionZ][startPositionX] == 0 || playFieldTable[startPositionZ][startPositionX] == undefined) {
            startPositionX++;

            if (startPositionX > 5) {
                startPositionX = 0;
                startPositionZ++;

                if (startPositionZ > 4)
                    startPositionZ = 0;
            }
        }
        keyboardIlluminate(startPositionX, startPositionZ);
    }
    else if (_key == 65) { //a
        resetKeyboardIlluminate(startPositionX, startPositionZ);

        startPositionX--;
        //if (startPositionX < 0) 
        //    startPositionX = 5;


        while (playFieldTable[startPositionZ][startPositionX] == 0 || playFieldTable[startPositionZ][startPositionX] == undefined) {
            startPositionX--;

            if (startPositionX < 0) {
                startPositionX = 5;
                startPositionZ--;

                if (startPositionZ < 0)
                    startPositionZ = 4;

            }
        }
        keyboardIlluminate(startPositionX, startPositionZ);
    }
    else if (_key == 87) {//w
        resetKeyboardIlluminate(startPositionX, startPositionZ);

        startPositionZ--;
        if (startPositionZ < 0)
            startPositionZ = 4;

        while (playFieldTable[startPositionZ][startPositionX] == 0) {
            startPositionZ--;

            if (startPositionZ < 0)
                startPositionZ = 4;

        }

        keyboardIlluminate(startPositionX, startPositionZ);
    }
    else if (_key == 83) { //s
        resetKeyboardIlluminate(startPositionX, startPositionZ);

        startPositionZ++;
        if (startPositionZ > 4)
            startPositionZ = 0;

        while (playFieldTable[startPositionZ][startPositionX] == 0) {
            startPositionZ++;

            if (startPositionZ > 4)
                startPositionZ = 0;

        }

        keyboardIlluminate(startPositionX, startPositionZ);
    }
    else if (_key == 13) { //enter
        enterClick(startPositionX, startPositionZ);
    }
}
