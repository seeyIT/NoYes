function UI() {
    
    $("#play").click(function () {
        $("#audio").trigger("play");
        console.log(tabVisual[0])
    });
    $("#pause").click(function () {
        $("#audio").trigger("pause");
    });

    $("#stop").click(function () {
        
        $("#audio").trigger("pause");
        $("#audio").prop("currentTime", 0);
    });

    $("#nextPlay").click(function () {
        songNumber++;
        if (songNumber >= allSongs)
            songNumber = 0;
        $("#audio").attr("src", "static/mp3/" + album + "/" + tabSongs[songNumber]);
        $("#audio").trigger("play");
    });

   
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext = new AudioContext();
        var audioElement = document.getElementById("audio");
        console.log(audioElement)
        var source = audioContext.createMediaElementSource(audioElement);

        var analyser = audioContext.createAnalyser();
        source.connect(analyser);

        analyser.connect(audioContext.destination);

        analyser.fftSize = 128; // musi być potęgą 2

        var dataArray = new Uint8Array(analyser.frequencyBinCount);

        analyser.getByteFrequencyData(dataArray)

    
    $("#audio").bind("timeupdate", function () {
        
        var length = $("#audio").prop("currentTime") / $("#audio").prop("duration") * 200;
        $("#currentLoaded").css("width", length + "px");

        
        refreshData();
        function refreshData() {
            requestAnimationFrame(refreshData);
            // stale pobieramy dane z dźwięku
            analyser.getByteFrequencyData(dataArray)
            //console.log(dataArray.length, tabVisual.length)
            
            //for (var i = 0; i < scene.children.length; i++) {
            //    scene.remove(scene.children[i]);
            //    tabVisual = [];
            //}
            //var material = new THREE.MeshBasicMaterial({
            //    color: 0xff00ff,
            //    specular: 0xffffff

            //})
            //for (var i = -4; i < 4; i++) {
            //    for (var j = -4; j < 4; j++) {
            //        var geometry = new THREE.CubeGeometry(15, dataArray[i] / 10, 15);
                
            //        mesh = new THREE.Mesh(geometry, material);
            //       // mesh.position = new THREE.Vector3(i * 20, 0, j * 20);
            //        mesh.position.set(i * 20, 0, j * 20);
            //        scene.add(mesh);
            //        tabVisual.push(mesh);
            //        }
            //}
            
            for (var i = 0; i < dataArray.length; i++) {
                tabVisual[i].scale.y = dataArray[i] / 10;
                tabVisual[i].position.y = dataArray[i]/20;


            }
        }
    });
    

    $("#loader").click(function (evt) {

        var lengthClicked = evt.pageX - 220;
        var length = lengthClicked / $("#audio").prop("duration") * 400;
        $("#audio").prop("currentTime", length);
    })
}