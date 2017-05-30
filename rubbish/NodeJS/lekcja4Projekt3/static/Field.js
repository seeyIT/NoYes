function Field() {
    var container = new THREE.Object3D();

    var lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(100, 0, 0));
    geometry.vertices.push(new THREE.Vector3(100, 0, 100));
    geometry.vertices.push(new THREE.Vector3(0, 0, 100));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));

    var line = new THREE.Line(geometry, lineMaterial);

    container.add(line);

    var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('png/mat3.png') })
    var ground = new THREE.PlaneBufferGeometry(90, 90);
    var mesh = new THREE.Mesh(ground, material);
    mesh.position.x = 50;
    mesh.position.y = 0;
    mesh.position.z = 50;

    mesh.rotateX(Math.PI/2);
    container.add(mesh);
    
    this.makeBoard = function() {
        return mesh;
    }
   

}