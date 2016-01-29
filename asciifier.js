/**  
 *	asciifier.js is an object class which generates the ascii effect of
 *	a given canvas display.
 */ 
define(function (require) {

	return function (canvas, config, animator) {
	
		var asciifier = this;
		
		/* Store the canvas element. */
		this.canvas = canvas;

		config = config || {};

		this.invert = true;
		if (config.invert !== undefined) {
			this.invert = config.invert;
		}

		this.asciiData = [" ", ".", ",", ";", "|", "/", "*", "+", "i", "o", "%", "@", "X", "#", "M", "W"];
		this.asciiIntervals = 255 / this.asciiData.length;

		/* Create the textarea. */
		this.textdiv = document.createElement("pre");
		this.textdiv.style.font = config.font || "bold 10px/7px Courier New";
		this.textdiv.style.position = "absolute";
		this.textdiv.style.height = "auto";
		this.textdiv.style.width = "auto";
		this.textdiv.style.margin = "0px";
		this.textdiv.style.background = config.background || "black";
		this.textdiv.style.color = config.color || "green";
		this.textdiv.innerHTML = "..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........";

		canvas.parentElement.appendChild(this.textdiv);
		canvas.parentElement.style.overflow = "hidden";

		this.textWidth = this.textdiv.offsetWidth / 10;
		this.textHeight = this.textdiv.offsetHeight / 10;
		
		/** Perform action for window resize event. */
		this.onResize = function () {
			asciifier.update();
		};
		
		this.update = function () {

			var context = asciifier.canvas.getContext("2d");
			var imageData = context.getImageData(0, 0, asciifier.canvas.width, asciifier.canvas.height);
			var pixels = imageData.data;

			var canvasWidthScale = asciifier.canvas.offsetWidth / asciifier.canvas.width;
			var canvasHeightScale = asciifier.canvas.offsetHeight / asciifier.canvas.height;

			var widthScale = asciifier.textWidth / canvasWidthScale;
			var heightScale = asciifier.textHeight / canvasHeightScale;

			var asciiCode = "";

			for (var y = 0; y <= asciifier.canvas.height - heightScale; y += heightScale) {
				for (var x = 0; x <= asciifier.canvas.width - widthScale; x += widthScale) {

					var i = Math.round(y) * asciifier.canvas.width * 4 + Math.round(x) * 4;

					var averageValue = pixels[i] + pixels[i+1] + pixels[i+2];

					if (asciifier.invert !== true) {
						averageValue = 765 - averageValue;
					}
					
					averageValue = averageValue / 3 * pixels[i+3] / 255;

					var currentValue = asciifier.asciiIntervals;
					var currentIndex = 0;

					while (averageValue > currentValue && currentIndex < asciifier.asciiData.length - 1) {
						currentValue += asciifier.asciiIntervals;
						currentIndex++;
					}

					asciiCode += asciifier.asciiData[currentIndex];
				}

				asciiCode += "\n";
			}

			asciifier.textdiv.innerHTML = asciiCode;
		};

		/* Fetch resize method of the canvas and window. */
		canvas.addEventListener("resize", asciifier.onResize);
		window.addEventListener("resize", asciifier.onResize);
		
		/* Update the canvas dimensions to fit the given container. */
		this.onResize();

		if (animator) {
			animator.addRenderFunction(this, this.update);
		}
	};
});
