function Intro() {
    var material = new THREE.MeshBasicMaterial({ color:  0xffffff * Math.random(), overdraw: 0.5 });

    var textGeometry = new THREE.TextGeometry(
            "do Boba :) ", {
                font: 'arial',
                size: 100,
                 height:10
                
            });

    var mesh = new THREE.Mesh(textGeometry, material);
    mesh.goNext = true;
    var box = new THREE.Box3().setFromObject(mesh);
    mesh.position.x = -box.size().x / 2;
    this.showText = function () {
        return mesh;
    }
}