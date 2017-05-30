function Building()
{
    var loader = new THREE.ColladaLoader();
    var model;
    var container = new THREE.Object3D;
    
    this.SpawnBuilding = function(name,scale,rotation)
        {
            loader.load(
          
              "models/house/"+name+".xml",
              function (collada) {
              
                  model = collada.scene;
              
                  model.traverse(function (child) {

                      if (child instanceof THREE.Mesh) {
                          //console.log(1)
                         // console.log("mesh " + child.name);                      
                      }

                  });

                  container.add(model);

                  //poprawki skali, położenia, obrotu
                  model.scale.set(scale,scale,scale);
                  model.rotation.y = rotation;
                  model.position.set(50,0,10)


              },
              // gdy model jest pobierany z serwera
                //jest możliwe monitorowanie stanu jego pobierania
                 //i wykonanie jakiejś czynności dopiero po załadowaniu

              function (e) {
                  console.log("model " + e.loaded +"-"+e.total)
              }
          );

            return container;
        }
    
        
    


}