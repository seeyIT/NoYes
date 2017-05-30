function Brick() {
    var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color:0x00f0ff })
    var ground = new THREE.BoxGeometry(20,20,20);
    var mesh = new THREE.Mesh(ground, material);

    mesh.position.x = 0;
    mesh.position.y = 55;
    mesh.position.z = 0;

    var material2 = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('png/mat3.png') })
    var ground2 = new THREE.BoxGeometry(90, 90, 90);
    mesh.updateMatrix();

    ground2.merge(mesh.geometry, mesh.matrix);
    //var mesh2 = new THREE.Mesh(mesh.geometry, mesh.matrix);

    var mesh2 = new THREE.Mesh(ground2, material2);

    this.spawnBrick = function() {
        return mesh2;
    }
}