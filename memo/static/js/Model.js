function Model(modelName,callback) {

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) { };

    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('models/'+modelName + '/');
    mtlLoader.load(modelName+'.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('models/' + modelName + '/');
        objLoader.load(modelName+'.obj', function (object) {
            callback(object);
        }, onProgress, onError);
    });

    
}