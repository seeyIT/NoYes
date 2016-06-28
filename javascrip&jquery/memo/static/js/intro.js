window.requestAnimFrame = (function(){
   
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  
		  function(/* function */ callback, /* DOMElement */ element){
			window.requestAnimFrame(animate, ctx.canvas);
		  };
})();


var introEffect = function() {

	var cycled = true;
	var text = "Memo";
	var color = 0;
	var xoffset =  window.innerWidth/3;
	var yoffset = window.innerHeight/2;
	var line = 0.6;
	var startpos = 118;
	var endpos = 3272;
	var alpha = 0.21;
	var cosdiv = 162;
	var sindiv = 80;
	var cos_wielokrotnosc =  0.766;
	var sin_wielokrotnosc =  0.348;
	var size = 160;
	var hue = color;
	
	function draw() {
		if (startpos > endpos) return;
		ctx.globalCompositeOperation = "lighter"; 
		ctx.lineWidth = line;
		ctx.font = size + "px arial";
		ctx.globalAlpha = alpha;
		var opacity = 1;

		var n = startpos;
		if (!cycled) {
			ctx.strokeStyle = "hsl(" + (color % 360) + ",99%,50%)"; 
		}
		(function animate() {
			var i = 8; while(i--) {
				if (n > endpos) return;
				n += line;
				ctx.globalAlpha = (0.5 - (n + startpos) / endpos) * alpha;

				if (cycled) {
					hue = n + color;
					ctx.strokeStyle = "hsl(" + (hue % 360) + ",99%,50%)"; 
				}
				var x = cos(n / cosdiv) * n * cos_wielokrotnosc; // cos
				var y = sin(n / sindiv) * n * sin_wielokrotnosc; // sin
				ctx.strokeText(text, x + xoffset, y + yoffset); // rysuje tekst
				
			}
			window.requestAnimFrame(animate, ctx.canvas);
		})();
	};

	/// zwraca interfejs
	return {
		"draw": draw
	};
};