// https://www.tutorialspoint.com/webgl/webgl_colors.htm
// @todo : Create functions to ease all this.

/**
 * Step 1 − Prepare the Canvas and Get the WebGL Rendering Context
 */
var canvas = document.getElementById('canvas-1');
canvas.width = 1920; // @todo : Get the screen size instead.
canvas.height = 1080; // @todo : Get the screen size instead.
gl = canvas.getContext('experimental-webgl', { antialias: true });
if (gl == null) {
   // Add error flashbag.
   setFlashbag('error', 'Unable to initialize WebGL. Your browser or machine may not support it.');
}

/**
 * Step 2 − Define the Geometry and Store it in the Buffer Objects
 */
var vertices = [
   -0.5, 0.5, 0.0,
   -0.5, -0.5, 0.0,
   0.5, -0.5, 0.0,
   0.5, 0.5, 0.0
];

var colors = [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1,];
indices = [3, 2, 1, 3, 1, 0];

var vertex_buffer = gl.createBuffer(); // Create a buffer object.
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Create an array buffer.  void gl.bindBuffer(target, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // Fill the buffer with our array.
gl.bindBuffer(gl.ARRAY_BUFFER, null); // Unbind the buffer.

var Index_Buffer = gl.createBuffer(); // Create an empty buffer object to store Index buffer
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer); // Bind appropriate array buffer to it
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW); // Pass the vertex data to the buffer
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // Unbind the buffer

// Create an empty buffer object and store color data
var color_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

/**
 * Step 3 − Create and Compile the Shader Programs
 */
// Vertex shaders.
var vertCode = 'attribute vec3 coordinates;'+
            'attribute vec3 color;'+
            'varying vec3 vColor;'+
            'void main(void) {' +
               ' gl_Position = vec4(coordinates, 1.0);' +
               'vColor = color;'+
            '}';
var vertShader = gl.createShader(gl.VERTEX_SHADER); // Create a vertex shader object
gl.shaderSource(vertShader, vertCode); // Attach vertex shader source code
gl.compileShader(vertShader); // Compile the vertex shader

// Fragment Shader.
var fragCode = 'precision mediump float;'+
            'varying vec3 vColor;'+
            'void main(void) {'+
               'gl_FragColor = vec4(vColor, 1.);'+
            '}';
var fragShader = gl.createShader(gl.FRAGMENT_SHADER); // Create fragment shader object
gl.shaderSource(fragShader, fragCode); // Attach fragment shader source code
gl.compileShader(fragShader); // Compile the fragmentt shader

/**
 * Create the shader program.
 * Associate the vertex and frag shaders. 
 */
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader); // Attach a vertex shader
gl.attachShader(shaderProgram, fragShader); // Attach a fragment shader
gl.linkProgram(shaderProgram); // Link both programs
gl.useProgram(shaderProgram); // Use the combined shader program object

/**
 * Step 4 − Associate the Shader Programs to Buffer Objects
 */
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);// Bind vertex buffer object
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer); // Bind index buffer object

var coord = gl.getAttribLocation(shaderProgram, "coordinates");// Get the attribute location
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);// Point an attribute to the currently bound VBO
gl.enableVertexAttribArray(coord);// Enable the attribute

gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer); // bind the color buffer

var color = gl.getAttribLocation(shaderProgram, "color");  // get the attribute location
gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) // point attribute to the volor buffer object
gl.enableVertexAttribArray(color); // enable the color attribute 


/**
 * Step 5 − Drawing the Required Object
 */
gl.clearColor(0, 0, 0, 0);// Clear the canvas
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Enable the depth test
gl.clear(gl.COLOR_BUFFER_BIT);// Clear the color buffer bitfalse
gl.viewport(0, 0, canvas.width, canvas.height);// Set the view port
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0); // Draw the triangles.