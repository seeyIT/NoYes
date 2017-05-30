var top; left;

var dive = document.getElementById("jedenDIV");

dive.onclick =  function(e)
{
   
    //var e = window.event;

    var posX = e.clientX-8;
    var posY = e.clientY-8;

    console.log(posX,posY)
    top = e.clientY;
    console.log(top)

    var obj = { left: posX, top: posY };

    $.ajax({
                    url: "http://localhost:3000",
                    data: obj,
                    type: "POST",
                    success: function (data) {
                        //czytamy odesłane z serwera dane
                        var obj = JSON.parse(data)

                        //console.log("odebrałem obliczenia z serwera")
                        //var Q = obj.a;
                        //$("#asd").val(Q);

                       // $("#divdiv").html(obj);
                        //tu wypisz sumę w div-ie na stronie

                    },
                    error: function (xhr, status, error) {
                        console.log('Error: ' + error.message);
                    },
    });
}