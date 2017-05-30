function Skybox()
{
    var materials = [];
    var container = new THREE.Object3D;

    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('models/skybox/snow_positive_x.jpg') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('models/skybox/snow_negative_x.jpg') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('models/skybox/snow_positive_y.jpg') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('models/skybox/snow_negative_y.jpg') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('models/skybox/snow_positive_z.jpg') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('models/skybox/snow_negative_z.jpg') }));

    var material = new THREE.MeshFaceMaterial(materials);
    var box = new THREE.BoxGeometry(1100, 1100, 1100, 1, 1, 1);
    var mesh = new THREE.Mesh(box, material);
    mesh.position.set(0,0,0);
    container.add(mesh);

    this.SpawnSky = function()
    {
        return container;
    }
}