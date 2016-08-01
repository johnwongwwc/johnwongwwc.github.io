require(["asciifier", "canvasview"], function(asciifier, CanvasView) {

	var style = document.createElement("style");
	style.type = "text/css";
	style.id = "mainStyle";
	style.innerHTML = [
		"html, body {",
			"width: 100%;",
			"height: 100%;",
		"}",
		"body {",
			"font-family: 'Ascii Default';",
			"margin: 0px;",
		"}",
		"#main {",
			"width: 100%;",
			"height: 100%;",
		"}",
	].join(" ");


	var head = document.getElementsByTagName("head")[0];
	head.appendChild(style);

	var body = document.getElementsByTagName("body")[0];
	
	/*
	var image = document.createElement('img');
	image.src = 'giphy.gif';

	image.onload = function() {
		var canvasView = new CanvasView(body);
		var animator = canvasView.animator;
		
		var asciify = new asciifier(canvasView.canvas, { background: "black", color: "green", invert: true }, canvasView.animator);
		canvasView.addRenderFunction(function () {
			console.log('sdfsdf')
		    	canvasView.getCanvas2DContext().drawImage(image, 0, 0, canvasView.canvas.width, canvasView.canvas.height);
		});
		canvasView.start();
		
		window.canvasView = canvasView;
	};
	
	body.appendChild(image);
	*/
	
	
	var video = document.createElement("video");
	video.style.display = "none";
	video.innerHTML = "Your browser does not support HTML5 video.";

	var source = document.createElement("source");
	source.src = "demo.ogv";
	source.type = "video/ogv";

	body.appendChild(video);
	video.appendChild(source);
	
	var canvasView = new CanvasView(body);
	var animator = canvasView.animator;
	
	var asciify = new asciifier(canvasView.canvas, { background: "black", color: "green", invert: true }, canvasView.animator);
	canvasView.addRenderFunction(function () {
		if(video.paused || video.ended) {
			return false;
		}
    	canvasView.getCanvas2DContext().drawImage(video, 0, 0, canvasView.canvas.width, canvasView.canvas.height);
	});

	video.play();
	canvasView.start();
	
/*
	var video = document.createElement("video");
	video.style.display = "none";
	video.innerHTML = "Your browser does not support HTML5 video.";

	body.appendChild(video);
	
	var canvasView = new CanvasView(body);
	canvasView.canvas.style.visibility = "hidden";
	var animator = canvasView.animator;

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	if (navigator.getUserMedia) {
		navigator.getUserMedia({ video: true  }, function (stream) {
			video.src = window.URL.createObjectURL(stream);
			var asciify = new asciifier(canvasView.canvas, { background: "black", color: "green", invert: true }, canvasView.animator);
			canvasView.addRenderFunction(function () {
				if(video.paused || video.ended) {
					return false;
				}
				canvasView.getCanvas2DContext().drawImage(video, 0, 0, canvasView.canvas.width, canvasView.canvas.height);
			});

			video.onpause = function() {
			    canvasView.pause();
			};

			video.play();
			canvasView.start();
		}, function () { console.log('you don\'t have camera permission allowed.'); });
	}
	*/
});
