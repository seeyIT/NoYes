function HeliModel() {

    var loader = new THREE.ColladaLoader();
    var model;
    var container = new THREE.Object3D;
    var wirnikD;
    var wirnikM;
    this.spawnModel = function() {


        loader.load("models/blackhawk.xml",
            function(collada) {
                innerCont = collada.scene;

                wirnikD = innerCont.getObjectByName("main_rotor");    // o tym mowa w punkcie  2         
                wirnikM = innerCont.getObjectByName("rear_rotor");    // o tym mowa w punkcie  2         
                container.add(innerCont);
                //wyskaluj model
                innerCont.scale.set(5, 5, 5);
                innerCont.rotateY(-Math.PI / 2)

                innerCont.traverse(function (child) {

                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture("models/fuselage.jpg") });
                    }

                });
            },
            // progress ładowania
            function(e) {
                //console.log( e.loaded)
                
            }
                    //można pokazać model dopiero jak się załaduje
                    //ale obliczenia działają poprawnie 
                    //tylko podczas ładowania przez serwer a najlepiej
                    //nie z localhosta

                    //console.log( e.loaded)
                    //console.log( e.total) 
                    

                
            );
        return container;
    }

    this.PropRotation = function () {
        try {
            wirnikD.rotation.z += 0.1;
            wirnikM.rotation.x += 0.1;
        } catch (e) {
            ;
        }
    }
}