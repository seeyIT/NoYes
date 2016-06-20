<?php
session_start(); 
?>
<!DOCTYPE HTML>
<html>
<head>
    <title>title</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <script src="bootstrap/jquery-2.0.0.js"></script>
    <link href="bootstrap/css/bootstrap-theme.css" rel="stylesheet" />

    <link href="bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" />

    <link href="bootstrap/css/bootstrap.css" rel="stylesheet" />
    <script src="bootstrap/js/bootstrap.js"></script>

    <script>
       
    window.addEventListener("load",start,false);
        function start(){
            $.getJSON("json.json",
                function(data) {
                    $("body").append("<a href=" + data.cover_url + ">" + data.title + "</a>");

                })

            var session = <?php echo json_encode($_SESSION); ?>;
            
            $("body").append("<img src='https://graph.facebook.com/"+session['FBID']+"/picture'  >");
            
            $form = $("<form ACTION='send.php' METHOD='POST'></form>");
            $form.append("<input type='text'; placeholder='Name' name='Name' required='required'/>");
            $form.append("<input type='text'; placeholder='Surname' name='Surname' /");
            $form.append("<input type='number'; value='12' name='Age' />");
            $form.append("<input type='submit'; value='Send' />");
            
            $("body").append($form);
        }
    </script>
   
</head>
<body>

</body>
</html>	