function Field(name,id,callback,modelChanges) {
    var field = new THREE.Object3D();
    field.uuid = id % 15;
    field.name = id;
    field.showed = false;
    var a = new Date().now;
    field.modelName = name+ field.uuid;

   


    var light = new Light();
    var _l = light.spawnLight();
    _l.name = id;

    _l.position.set(0, 100, 0);
    
    field.add(_l);

    var material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color:0xffffff })
    var ground = new THREE.PlaneBufferGeometry(100, 100);
    var mesh = new THREE.Mesh(ground, material);
    mesh.card = true;
    mesh.name = id;
    mesh.uuid = id;
    mesh.clicked = false;
    mesh.position.set(0, 0, 0);
    mesh.rotateX(Math.PI / 2);

  

    field.add(mesh);
    field.position.set(0, 0, 0);

    var modelInvoke = new Model(name, function (model) {
        model.position.set(0, -100, 0);
        model.name = "Model";
        model.uuid = id;
        model.scale.x = modelChanges.scaleX;
        model.scale.y = modelChanges.scaleY;
        model.scale.z = modelChanges.scaleZ;
        model.rotateX(Math.PI / modelChanges.rotX);
        model.rotateY(Math.PI / modelChanges.rotY);
        model.rotateZ(Math.PI / modelChanges.rotZ);


        model.visible = false;
        field.add(model);
        callback();
    });
    

    this.spawnField = function() {
        return field;
    }
}