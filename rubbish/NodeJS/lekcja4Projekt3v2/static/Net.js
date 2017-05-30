var album;
var songNumber;
var allSongs;
var tabSongs;
var tabVisual = [];
var scene;

function Net()
{
    firstRequest();
    function firstRequest()
    {
        var wysylanie = {
            akcja: "first"
        }
        $.ajax({
            url: "http://localhost:3000",
            data: wysylanie,
            type: "POST",
            success: function (data) {
                var a = JSON.parse(data)
                
                CreatePanel();
                DisplaySongs(a[1]);
                DisplayAlbums(a[0]);
                MakePlane();
            },
            error: function (xhr, status, error) {
                //console.log('Error: ' + error.message);
            },
        });
    }

    //nextRequerst(albumName);
    function nextRequerst(albumName) {
        album = albumName;
        var wysylanie = {
            akcja: "next",
            album: albumName
        }

        $.ajax({
            url: "http://localhost:3000",
            data: wysylanie,
            type: "POST",
            success: function (data) {
                var a = JSON.parse(data)
                console.log(a[0])
                DisplaySongs(a[0]);

            },
            error: function (xhr, status, error) {
                //console.log('Error: ' + error.message);
            },
        });

    }

    function MakePlane() {
        scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        var renderer = new THREE.WebGLRenderer();
        var angle = 0;

        var material = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            specular: 0xffffff
           
        })
        
        for (var i = -4; i < 4; i++) {
            for (var j = -4; j < 4; j++) {
                var geometry = new THREE.CubeGeometry(15,1,15);
                
                mesh = new THREE.Mesh(geometry, material);
               // mesh.position = new THREE.Vector3(i * 20, 0, j * 20);
                mesh.position.set(i * 20, 0, j * 20);
                scene.add(mesh);
                tabVisual.push(mesh);
            }
        }
        console.log(tabVisual)
        renderer.setClearColor(0x00ff00);
        renderer.setSize(500, 500);
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        var axis = new THREE.AxisHelper(200);
        scene.add(axis);
        document.getElementById("visual").appendChild(renderer.domElement);
        camera.position.x = 5000;
        camera.position.y = 00;
        camera.position.z = 5000;
                var cameraLookAtPoint = new THREE.Vector3(0, 0, 0);
        camera.lookAt(cameraLookAtPoint);

        AnimateScene();



        function AnimateScene() {
            camera.position.x = Math.cos(angle / 90) * 100; // w prawo
            camera.position.z = Math.sin(angle / 90) * 100;
            angle--;
            camera.lookAt(cameraLookAtPoint);
            requestAnimationFrame(AnimateScene);
            renderer.render(scene, camera);
        }
        
    }

    


    function DisplayAlbums(albums) {
        var length = albums.length;
        
        album = albums[0]
        for (var i = 0; i < length; i++) {
            console.log(i)
            $("#bottomDiv").append("<div class='albums' style=' background-image: url(static/mp3/" + albums[i] + "/cover.png); background-repeat: no-repeat;position:relative;left:" + 200 * (i + 1) + "px;top:50px;width:100px;height:100px;display:inline-block;font-size:0'>" + albums[i] + "</div>");
        }

        $(".albums").click(function () {
            console.log(this.innerHTML)
            nextRequerst(this.innerHTML)
        })

    }

    function DisplaySongs(songs) {
        $("#rightDiv").html("")
        tabSongs = songs;
        var length = songs.length;
        allSongs = length;

        for (var i = 0; i < length; i++) {
            $("#rightDiv").append("<div class='songs'>" + songs[i] + "</div>");

        }

        $(".songs").click(function () {
            songNumber = songs.indexOf(this.innerHTML)
            
            $("#audio").attr("src", "static/mp3/" + album + "/" + this.innerHTML);
            $("#audio").trigger("play");
        })
    }

}





function CreatePanel() {
    var d = document.createElement("div");

    $(d).attr("id", "topDiv");
    $(d)
        .css("width", "800px")
        .css("height", "200px")
        .css("position", "absolute")
        .css("top", "55px")
        .css("left", "200px")
        .css("background-color", "red")
        .appendTo($("#Board"));

    var d1 = document.createElement("div");
    $(d1).attr("id", "leftDiv");
    $(d1)
        .css("width", "300px")
        .css("height", "500px")
        .css("position", "absolute")
        .css("top", "250px")
        .css("left", "200px")
        .css("background-color", "blue")
        .appendTo($("#Board"));

    var play = document.createElement("div");
    $(play)
        .attr("id", "play")
        .html("GO")
        .css("width", "50px")
        .css("height", "50px")
        .css("position", "absolute")
        .css("top", "250px")
        .css("left", "100px")
        .css("background-color", "greenyellow")
        .appendTo($("#leftDiv"));

    var pause = document.createElement("div");
    $(pause)
        .attr("id", "pause")
        .html("pause")
        .css("width", "50px")
        .css("height", "50px")
        .css("position", "absolute")
        .css("top", "250px")
        .css("left", "10px")
        .css("background-color", "goldenrod")
        .appendTo($("#leftDiv"));

    var stop = document.createElement("div");
    $(stop)
        .attr("id", "stop")
        .html("stop")
        .css("width", "50px")
        .css("height", "50px")
        .css("position", "absolute")
        .css("top", "250px")
        .css("left", "200px")
        .css("background-color", "indigo")
        .appendTo($("#leftDiv"));

    var loader = document.createElement("div");
    $(loader)
        .attr("id", "loader")
        .css("width", "200px")
        .css("height", "20px")
        .css("position", "absolute")
        .css("top", "450px")
        .css("left", "20px")
        .css("background-color", "yellow")
        .appendTo($("#leftDiv"));

    var currentLoaded = document.createElement("div");
    $(currentLoaded)
        .attr("id", "currentLoaded")
        .css("width", "0px")
        .css("height", "5px")
        .css("position", "absolute")
        .css("top", "465px")
        .css("left", "20px")
        .css("background-color", "blueviolet")
        .appendTo($("#leftDiv"));

    var nextPlay = document.createElement("div");
    $(nextPlay)
        .attr("id", "nextPlay")
        .html("next")
        .css("width", "50px")
        .css("height", "50px")
        .css("position", "absolute")
        .css("top", "350px")
        .css("left", "100px")
        .css("background-color", "greenyellow")
        .appendTo($("#leftDiv"));


    var d2 = document.createElement("div");
    $(d2).attr("id", "rightDiv");
    $(d2)
        .css("width", "500px")
        .css("height", "500px")
        .css("position", "absolute")
        .css("top", "250px")
        .css("left", "500px")
        .css("background-color", "pink")
        .appendTo($("#Board"));

    var d3 = document.createElement("div");
    $(d3).attr("id", "bottomDiv");
    $(d3)
        .css("width", "800px")
        .css("height", "200px")
        .css("position", "absolute")
        .css("top", "750px")
        .css("left", "200px")
        .css("background-color", "greenyellow")
        .appendTo($("#Board"));

}