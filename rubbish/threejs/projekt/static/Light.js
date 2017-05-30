function Light() {
    var light = new THREE.PointLight(0xffffff, 2, 150);
    // ostatnia wartosc to dystans 

    light.position.set(0, 0, 0);

    //light.intensity = 0.5;
    this.changeColor = function(color) {
        light.color.setHex(color);
    }

    this.spawnLight = function() {
        return light;
    }
    
}