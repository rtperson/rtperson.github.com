

// We keep a global dictionary of loaded sprite-sheets,
// which are each an instance of our SpriteSheetClass
// below.
//
// This dictionary is indexed by the URL path that the
// atlas is located at. For example, calling:
//
// gSpriteSheets['grits_effects.png'] 
//
// would return the SpriteSheetClass object associated
// to that URL, assuming that it exists.
var gSpriteSheets = {};
var xhr = new XMLHttpRequest();
var effects = {};

//-----------------------------------------
SpriteSheetClass = Class.extend({

    // We store in the SpriteSheetClass:
    //
    // The Image object that we created for our
    // atlas.
    img: null,

    // The URL path that we grabbed our atlas
    // from.
    url: "",

    // An array of all the sprites in our atlas.
    sprites: new Array(),

    //-----------------------------------------
    init: function () {},

    //-----------------------------------------
    // Load the atlas at the path 'imgName' into
    // memory. This is similar to how we've
    // loaded images in previous units.
    load: function (imgName) {
        // Store the URL of the spritesheet we want.
        this.url = imgName;
        
        // Create a new image whose source is at 'imgName'.
        var img = new Image();
        img.src = imgName;

        // Store the Image object in the img parameter.
        this.img = img;

        // Store this SpriteSheetClass in our global
        // dictionary gSpriteSheets defined above.
        gSpriteSheets[imgName] = this;
    },

    //-----------------------------------------
    // Define a sprite for this atlas
    defSprite: function (name, x, y, w, h, cx, cy) {
        // We create a new object with:
        //
        // The name of the sprite as a string
        //
        // The x and y coordinates of the sprite
        // in the atlas.
        //
        // The width and height of the sprite in
        // the atlas.
        //
        // The x and y coordinates of the center
        // of the sprite in the atlas. This is
        // so we don't have to do the calculations
        // each time we need this. This might seem
        // minimal, but it adds up!
        var spt = {
            "id": name,
            "x": x,
            "y": y,
            "w": w,
            "h": h,
            "cx": cx == null ? 0 : cx,
            "cy": cy == null ? 0 : cy
        };

        // We push this new object into
        // our array of sprite objects,
        // at the end of the array.
        this.sprites.push(spt);
    },

    //-----------------------------------------
    // Parse the JSON file passed in as 'atlasJSON'
    // that is associated to this atlas.
    parseAtlasDefinition: function (atlasJSON) {
        // Parse the input 'atlasJSON' using the
        // JSON.parse method and store it in a
        // variable.
        //
        // YOUR CODE HERE
        var effects = JSON.parse(atlasJSON);


        // For each sprite in the parsed JSON,
        // 'chaingun.png', chaingun_impact.png',
        // etc.:
        //
        // 1) Calculate the center (x,y) offsets
        //    from the 'width' and 'height'
        //    values listed in the JSON.
        //    Note that these are an offset
        //    FROM the 'width' and 'height',
        //    so they will be negative!
        //
        // 2) Pass the sprite name, the (x,y)
        //    coordinates, the width and height,
        //    and the center (x,y) offsets
        //    you just calculated to the above
        //    'defSprite' method of our
        //    'SpriteSheetClass'.
        //
        // YOUR CODE HERE
        for (var key in effects.frames) { 
            var obj = effects.frames[key].frame; 
            if (effects.frames.hasOwnProperty(key)) {
                // calculate center
                var cx = -(obj.w / 2);
                var cy = -(obj.h / 2);

                // call defSprite with key, x, y, w, h, cx, & cy
                this.defSprite(key, obj.x, obj.y, obj.w, obj.h, cx, cy);
            }
        }
        
    }

        //-----------------------------------------
    // Walk through all the sprite definitions for this
    // atlas, and find which one matches the name.
    getStats: function (name) {
        // For each sprite in the 'sprites' Array...
        for(var i = 0; i < this.sprites.length; i++) {
            
            // Check if the sprite's 'id' parameter
            // equals the passed in name...
            if(this.sprites[i].id === name) {
                // and return that sprite if it does.
                return this.sprites[i];
            }

        }

        // If we don't find the sprite, return null.
        return null;
    }

});

//-----------------------------------------
// External-facing function for drawing sprites based
// on the sprite name (ie. "chaingun.png", and the
// position on the canvas to draw to.
function drawSprite(spritename, posX, posY) {
    // Walk through all our spritesheets defined in
    // 'gSpriteSheets' and for each sheet:
    //
    // 1) Use the getStats method of the spritesheet
    //    to find if a sprite with name 'spritename'
    //    exists in that sheet.
    //
    // 2) If we find the appropriate sprite, call
    //    '__drawSpriteInternal' with parameters as
    //    described below.
    //
    // YOUR CODE HERE

}

//-----------------------------------------
// External-facing function for drawing sprites based
// on the sprite object stored in the 'sprites Array,
// the 'SpriteSheetClass' object stored in the
// 'gSpriteSheets' dictionary, and the position on
// canvas to draw to.
function __drawSpriteInternal(spt, sheet, posX, posY) {
    // First, check if the sprite or sheet objects are
    // null.
    //
    // YOUR CODE HERE
    
    
    // Call the drawImage method of our canvas context
    // using the full drawImage API. drawImage takes,
    // in order:
    //
    // 1) the Image object to draw, this is our entire
    //    spritesheet.
    //
    // 2) the x-coordinate we are drawing from in the
    //    spritesheet.
    //
    // 3) the y-coordinate we are drawing from in the
    //    spritesheet.
    //
    // 4) the width of the sprite we are drawing from
    //    our spritesheet.
    //
    // 5) the height of the sprite we are drawing from
    //    our spritesheet.
    //
    // 6) the x-coordinate we are drawing to in our
    //    canvas.
    //
    // 7) the y-coordinate we are drawing to in our
    //    canvas.
    //
    // 8) the width we are drawing in our canvas. This
    //    is in case we want to scale the image we are
    //    drawing to the canvas. In our case, we don't.
    //
    // 9) the height we are drawing in our canvas. This
    //    is in case we want to scale the image we are
    //    drawing to the canvas. In our case, we don't.
    //
    // Wow, that's a lot of parameters. Luckily, most
    // of them are stored directly in the sprite object
    // we want to draw.
    //
    // YOUR CODE HERE
    
    
}

});

