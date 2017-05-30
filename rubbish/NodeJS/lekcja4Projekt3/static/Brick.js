function Brick() {
    var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('png/mat3.png') })
    var ground = new THREE.BoxGeometry(90,90,90);
    var mesh = new THREE.Mesh(ground, material);

    this.spawnBrick = function() {
        return mesh;
    }
}