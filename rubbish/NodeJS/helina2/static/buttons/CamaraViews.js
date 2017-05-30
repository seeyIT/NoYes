function CamaraViews() {

    document.addEventListener("keydown",Views, true);
    var enable = false;

    function Views(e) {
        //.log(e.which)
        if (e.which != 90)
            return;
        if (!enable) {
            main.style.display = "block";
            enable = true;
        }
        else
        {
            main.style.display = "none";
            enable = false;
        }
    }

    var main = document.createElement("div");
    main.style.width = 700 + "px";
    main.style.height = 100 + "px";
    main.style.background = "grey";
    main.style.position = "absolute";
    main.style.display = "none";
    main.style.top = 0 + "px";
    main.style.left = 200 + "px";

    var przod = document.createElement("div");
    przod.setAttribute("X", -100);
    przod.setAttribute("Y", 10);
    przod.setAttribute("Z", 0);
    przod.setAttribute("Kokpit", 0);
    przod.style.width = 80 + "px";
    przod.style.height = 80 + "px";
    przod.style.backgroundImage = "url('materials/przod.png')";
    przod.style.backgroundRepeat = "no-repeat";
    przod.style.backgroundSize = "cover";
    przod.style.position = "relative";
    przod.style.display = "inline-block";
    przod.style.top = 10 + "px";
    przod.style.left = 30 + "px";
    main.appendChild(przod);

    var tyl = document.createElement("div");
    tyl.setAttribute("X", 100);
    tyl.setAttribute("Y", 10);
    tyl.setAttribute("Z", 0);
    tyl.setAttribute("Kokpit", 0);;
    tyl.style.width = 80 + "px";
    tyl.style.height = 80 + "px";
    tyl.style.backgroundImage = "url('materials/tyl.png')";
    tyl.style.backgroundRepeat = "no-repeat";
    tyl.style.backgroundSize = "cover";
    tyl.style.position = "relative";
    tyl.style.display = "inline-block";
    tyl.style.top = 10 + "px";
    tyl.style.left = 60 + "px";
    main.appendChild(tyl);

    var lewo = document.createElement("div");
    lewo.setAttribute("X", 00);
    lewo.setAttribute("Y", 10);
    lewo.setAttribute("Z", 100);
    lewo.setAttribute("Kokpit", 0);
    lewo.style.width = 80 + "px";
    lewo.style.height = 80 + "px";
    lewo.style.backgroundImage = "url('materials/lewo.png')";
    lewo.style.backgroundRepeat = "no-repeat";
    lewo.style.backgroundSize = "cover";
    lewo.style.position = "relative";
    lewo.style.display = "inline-block";
    lewo.style.top = 10 + "px";
    lewo.style.left = 90 + "px";
    main.appendChild(lewo);

    var gora = document.createElement("div");
    gora.setAttribute("X", 00);
    gora.setAttribute("Y", 100);
    gora.setAttribute("Z", 0);
    gora.setAttribute("Kokpit", 0);
    gora.style.width = 80 + "px";
    gora.style.height = 80 + "px";
    gora.style.backgroundImage = "url('materials/gora.png')";
    gora.style.backgroundRepeat = "no-repeat";
    gora.style.backgroundSize = "cover";
    gora.style.position = "relative";
    gora.style.display = "inline-block";
    gora.style.top = 10 + "px";
    gora.style.left = 120 + "px";
    main.appendChild(gora);

    var dol = document.createElement("div");
    dol.setAttribute("X", 000);
    dol.setAttribute("Y", -100);
    dol.setAttribute("Z", 0);
    dol.setAttribute("Kokpit", 0);
    dol.style.width = 80 + "px";
    dol.style.height = 80 + "px";
    dol.style.backgroundImage = "url('materials/dol.png')";
    dol.style.backgroundRepeat = "no-repeat";
    dol.style.backgroundSize = "cover";
    dol.style.position = "relative";
    dol.style.display = "inline-block";
    dol.style.top = 10 + "px";
    dol.style.left = 150 + "px";
    main.appendChild(dol);

    var kopit = document.createElement("div");
    kopit.setAttribute("X", -23);
    kopit.setAttribute("Y", -17);
    kopit.setAttribute("Z", 0);
    kopit.setAttribute("Kokpit", 1);
    kopit.style.width = 80 + "px";
    kopit.style.height = 80 + "px";
    kopit.style.backgroundImage = "url('materials/kokpit.png')";
    kopit.style.backgroundRepeat = "no-repeat";
    kopit.style.backgroundSize = "cover";
    kopit.style.position = "relative";
    kopit.style.display = "inline-block";
    kopit.style.top = 10 + "px";
    kopit.style.left = 180 + "px";
    main.appendChild(kopit);

    document.body.appendChild(main);

    this.returnButtons = function() {
        return main.children;
    }
}
