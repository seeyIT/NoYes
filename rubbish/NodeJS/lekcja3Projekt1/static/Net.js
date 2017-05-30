function Net()
{
    this.send = function()
    {
        alert("poszlo")
    }

    document.getElementById("Zaloguj").addEventListener("click",zaloguj)
    function zaloguj()
    {
        var userName = document.getElementById("Nickname").value;
        var wysylanie = {
            akcja: "add",
            user: userName,
        }

        $.ajax({
            url: "http://localhost:3000",
            data: wysylanie,
            type: "POST",
            success: function (data) {
                var a = JSON.parse(data)
                
                if (a[0]==1)
                {
                    document.getElementById("Loggin").style.display = "none";
                    game.SpawnFigures(a[1]);
                    game.SpawnBoard();
                    document.getElementById("Wait").style.display = "block";
                    game.SetColor("white");
                    game.StartChecking();
                    game.SprawdzaniePlanszy()
                }
                else if (a[0] == 2)
                {
                   
                    document.getElementById("Loggin").style.display = "none";
                    game.SpawnFigures(a[1]);
                    game.TurnCamera();
                    game.SpawnBoard();
                    game.SetColor("black");
                    game.CheckMovement();
                    game.SprawdzaniePlanszy()
                    game.SetMove(true);
                }

               

               
            },
            error: function (xhr, status, error) {
                //console.log('Error: ' + error.message);
            },
        });
    }
    


    document.getElementById("Reset").addEventListener("click", reset)
    function reset() {
        
        var wysylanie = {
            akcja: "reset"            
        }

        $.ajax({
            url: "http://localhost:3000",
            data: wysylanie,
            type: "POST",
            success: function (data) {                

            },
            error: function (xhr, status, error) {
                //console.log('Error: ' + error.message);
            },
        });
    }

    this.Send = function(tab)
    {
        var foo = JSON.stringify(tab);
        
        var wysylanie = {
            akcja: "update",
            tabela: foo
        }
        
        $.ajax({
            url: "http://localhost:3000",
            data: wysylanie,
            type: "POST",
            success: function (data) {

            },
            error: function (xhr, status, error) {
                //console.log('Error: ' + error.message);
            },
        });
    }

    this.CheckForMove = function () {
        var wysylanie = {
            akcja: "checkMove"

        }

        $.ajax({
            url: "http://localhost:3000",
            data: wysylanie,
            type: "POST",
            success: function (data) {
                
                var foo = JSON.parse(data);
               
                //if (foo[0] == true) {
                //    console.log("rushczarne");
                //    if (game.TakeColor() == "white") {
                //        game.SetMove(false);
                //        console.log(game.TakeColor())
                       
                //    }
                //    if (game.TakeColor() == "black") {
                //        game.SetMove(true);
                        
                //    }
                //}
                //if (foo[0] == false) {
                //    console.log("rushcbiale");
                //    console.log("kolor", game.TakeColor());
                //    if (game.TakeColor() == "white") {
                //        game.SetMove(true);
                //        console.log("biale", game.TakeColor())

                //    }
                //    if (game.TakeColor() == "black") {
                //        game.SetMove(false);
                //    }
                //}

                

            },
            error: function (xhr, status, error) {
                //console.log('Error: ' + error.message);
            },
        });
    }

    this.TakeBoard = function()
    {
        var wysylanie = {
            akcja: "TakeBoard"

        }

        $.ajax({
            url: "http://localhost:3000",
            data: wysylanie,
            type: "POST",
            success: function (data) {

                var a = JSON.parse(data);
                game.ClearBoard();
                game.SpawnFigures(a);


            },
            error: function (xhr, status, error) {
                //console.log('Error: ' + error.message);
            },
        });
    }


    this.CheckForSecond = function()
    {
        var wysylanie = {
            akcja: "check"
            
        }

        $.ajax({
            url: "http://localhost:3000",
            data: wysylanie,
            type: "POST",
            success: function (data) {
                
                var foo = JSON.parse(data)
                
                if (foo == "GOGOGO")
                {
                    document.getElementById("Wait").style.display = "none";
                }
                
            },
            error: function (xhr, status, error) {
                //console.log('Error: ' + error.message);
            },
        });
    }



}