var canvas = null;
var context = null;
var img = null;

var onImageLoad = function () {
    "use strict";
    console.log("IMAGE!!!");
    context.drawImage(img, 192, 192);
    // Draw an image to the canvas at position 192,192.
    // Remember that the drawImage method is attached
    // to the 2D Context, not the canvas element!
    // YOUR CODE HERE
};

var setup = function () {
    "use strict";
    var body = document.getElementById("body");
    canvas = document.createElement("canvas");

    context = canvas.getContext('2d');

    canvas.setAttribute('width', 700);
    canvas.setAttribute('height', 500);

    body.appendChild(canvas);

    img = new Image();
    img.onload = onImageLoad;
    img.src = "/img/ralphyrobot.png";
};

setup();