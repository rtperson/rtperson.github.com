


var canvas = null;
var context = null;
var framerate = 1000/30;
var frame = 0;
var assets = ['/img/animation/robowalk00.png',
              '/img/animation/robowalk01.png',
              '/img/animation/robowalk02.png',
              '/img/animation/robowalk03.png',
              '/img/animation/robowalk04.png',
              '/img/animation/robowalk05.png',
              '/img/animation/robowalk06.png',
              '/img/animation/robowalk07.png',
              '/img/animation/robowalk08.png',
              '/img/animation/robowalk09.png',
              '/img/animation/robowalk10.png',
              '/img/animation/robowalk11.png',
              '/img/animation/robowalk12.png',
              '/img/animation/robowalk13.png',
              '/img/animation/robowalk14.png',
              '/img/animation/robowalk15.png',
              '/img/animation/robowalk16.png',
              '/img/animation/robowalk17.png',
              '/img/animation/robowalk18.png'
             ];
var frames = [];

var onImageLoad = function(){
    console.log("IMAGE!!!");
};

var setup = function() {
    body = document.getElementById('body');
    canvas = document.createElement('canvas');

    context = canvas.getContext('2d');
    
    canvas.width = 100;
    canvas.height = 100;

    body.appendChild(canvas);

    // Load each image URL from the assets array into the frames array 
    // in the correct order.
    // Afterwards, call setInterval to run at a framerate of 30 frames 
    // per second, calling the animation function each time.
    for (var x = 0; x < assets.length; x++) {
        frames.push(new Image());
        frames[x].onload = function() {
            context.drawImage(img, 0, 0);
        };
        frames[x].src = assets[x];
    }
    setInterval(animation, framerate);
};

var animation = function(){
    // Draw each frame in order, looping back around to the 
    // beginning of the animation once you reach the end.
    // Draw each frame at a position of (0,0) on the canvas.
  
    // Try your code with this call to clearRect commented out
    // and uncommented to see what happens!
    //
    context.clearRect(0,0,canvas.width, canvas.height);
    context.drawImage(frames[frame], 0, 0);
    frame = (frame + 1) % frames.length;

};

setup();
