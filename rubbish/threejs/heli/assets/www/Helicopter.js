function Helicopter()
{
    var contaiter = new THREE.Object3D();
    //kokpit
    var box = new THREE.BoxGeometry(20, 15, 15, 1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh(box, Materials.materials[0]);
    mesh.position.x = 10;
    mesh.position.y = 5;
    mesh.position.z = 0;
    contaiter.add(mesh);

    //duze smiglo
    var boxD = new THREE.BoxGeometry(60, 1, 2, 1, 1, 1);
    var meshD = new THREE.Mesh(boxD, Materials.materials[0]);
    meshD.position.x = 10;
    meshD.position.y = 12.5;
    meshD.position.z = 0;
    contaiter.add(meshD);

    //przedluzenie
    var box = new THREE.BoxGeometry(30, 3, 3, 1, 1, 1);
    var mesh = new THREE.Mesh(box, Materials.materials[1]);
    mesh.position.x = 35;
    mesh.position.y = 5;
    mesh.position.z = 0;
    contaiter.add(mesh);

    //koncowka
    var box = new THREE.BoxGeometry(5, 10, 3, 1, 1, 1);
    var mesh = new THREE.Mesh(box, Materials.materials[0]);
    mesh.position.x = 52.5;
    mesh.position.y = 7.5;
    mesh.position.z = 0;
    contaiter.add(mesh);

    //male smiglo
    var boxS = new THREE.BoxGeometry(20, 3, 1, 1, 1, 1);
    var meshS = new THREE.Mesh(boxS, Materials.materials[0]);
    meshS.position.x = 52.5;
    meshS.position.y = 7.5;
    meshS.position.z = 2;
    meshS.translateY(Math.PI / 2);
    contaiter.add(meshS);

    this.PropRotation = function()
    {
        meshD.rotation.y += 0.2;
        meshS.rotation.z += 0.2;
    }
    
    this.SpawnHelicopter = function()
    {
        return contaiter;
    }
}