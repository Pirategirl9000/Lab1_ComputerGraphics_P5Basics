
/**
 * An enum for assignment of the different program modes
 */
const MODES = {
  DYNAMIC_BACKGROUND: 1,
  ANIMATED_OBJECT: 2,
  DRAW_MODE: 3,  // This is mouse-interact, I just thought draw mode was a better name for it
  PATTERN_GENERATION: 4
};

/**
 * An enum for assignment of drawing modes for MOUSE_INTERACT mode
 */
const DRAWMODES = {
  SQUARE: 1,  // Draw squares where you click
  CIRCLE: 2,  // Draw cricles where you click
  PENCIL: 3,  // Draw tiny rectangles the size of a pixel where you click
  ERASER: 4   // Draw small circles with color that matches the background where you click
}

/**
 * An enum for the different keys accepted by the program and their corresponding keycode
 */
const KEYS = {
  ONE: 49,
  TWO: 50,
  THREE: 51,
  FOUR: 52,
  Q: 81,
  W: 87,
  E: 69,
  R: 82,
  PLUS: 187,
  MINUS: 189
}

/**
 * Stores all the attributes related to the circle
 */
const Circle = {
  x: 0,
  y: 0,
  diameter: 20,
  xSpeed: 1,
  ySpeed: 1,
  color: [255, 255, 255]
}

/**
 * The background color for the canvas
 */
let backgroundColor = [255, 255, 255];

/**
 * The current mode for the program
 */
let mode = MODES.DYNAMIC_BACKGROUND;

/**
 * Current draw mode for the program, identifies what will be drawn on mouse down when in draw mode
 */
let currentDrawMode = DRAWMODES.SQUARE;

/**
 * The current drawSize for all drawings, affects shape size and stroke size (pencil & eraser)
 */
let drawSize = 20;

/**
 * Creates the canvas for the program
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  Circle.color = getRandomColor();
}

/**
 * Renders the current background and any objects that must be drawn to screen
 */
function draw() {
  handleInputs();

  if (mode == MODES.DYNAMIC_BACKGROUND) {
    background(backgroundColor);
    displayInstructions();
    printBackgroundColor();
  } else if (mode == MODES.ANIMATED_OBJECT) {
    background(backgroundColor);
    displayInstructions();
    updateAnimatedCircle();
  } else if (mode == MODES.MOUSE_INTERACT) {
    // We don't repaint the background or instructions here since that causes some rendering issues
    drawMode();
  }

  // Display instructions last so that nothing will draw over the instructions

}

/**
 * Triggers when the window is resized, resizes the canvas in accordance
 */
function windowResized() {
  // We don't resize when in ANIMATED_OBJECT because then the ball gets stuck off screen
  if (mode == MODES.ANIMATED_OBJECT) {return};
  resizeCanvas(windowWidth, windowHeight); 
}

/**
 * Handles any action that needs to result from a mouse movement
 */
function mouseMoved() {
  if (mode == MODES.DYNAMIC_BACKGROUND) {
    dynamicBackground();
  }
}

/**
 * Displays the instructions for changing modes
 */
function displayInstructions() {
  // Check to see if the background is currently white and changes the text color to black if it is or white if it isn't
  // Thanks to https://www.geeksforgeeks.org/javascript/how-to-compare-two-arrays-in-javascript/ for providing a quick way to compare arrays
  if (JSON.stringify(backgroundColor) == JSON.stringify([255,255,255])) {
    fill(0, 0, 0);
  } else {
    fill(255, 255, 255);
  }

  text("Press the number key of the mode you would like to select(default = 1)", 0, 20);
  
  // Iterate through every mode and print an instruction based on the MODES enum
  for ([key, value] of Object.entries(MODES)) {
    // Get the raw instruction and the value associated with it, this will also serve as the key to change to that mode
    let instruction = `${key}: ${value}`;

    // Reformat instruction to be properly capitilized and not all caps and replace underscores with spaces
    instruction = instruction.charAt(0).toUpperCase() + instruction.substring(1, instruction.length).toLowerCase().replace("_", " ");

    // Print out the instruction
    text(instruction, (value-1)*250, 40);
  }
  
}

/**
 * Recalculates the new backgroundColor based on the mouse's position and window dimensions
 */
function dynamicBackground() {
  // Scales a value between [0, 1]  to a value between [0, 255]
  const scaleToColor = (pos) => Math.round(pos * 255);

  // We'll use mouseX and mouseY for red and blue respectively
  const relativeXPos = mouseX / windowWidth;
  const relativeYPos = mouseY / windowHeight;

  // Set the color of the background using the relative mouse positions and scale it to [0, 255]
  backgroundColor = [relativeXPos, 0, relativeYPos].map(scaleToColor);
}

/**
 * Prints the current background color to the canvas
 */
function printBackgroundColor() {
    const textOut =`RGB(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`;
    fill(255)
    text(textOut, 0, windowHeight);
}

/**
 * Gets all the keys currently pressed and returns an array containing all of the codes
 * @returns ```number[]``` keycodes
 */
function getKeysPressed() {
  const keysPressed = [];

  // Check every KEY to see if it's being pressed and add it to the array if it is
  Object.values(KEYS).forEach((code) => { if (keyIsDown(code)) keysPressed.push(code) });

  return keysPressed;
}

/**
 * Grabs and handles the inputs
 */
function handleInputs() {
  // Grab the current keys held
  const keysPressed = getKeysPressed();
  const leftClickDown = (mouseIsPressed) ? mouseButton == "left" : false;

  // Iterate through the keys and perform their logic
  for (let i = 0; i < keysPressed.length; i++) {
    const key = keysPressed[i];

    switch (key) {
      case KEYS.ONE:
        mode = MODES.DYNAMIC_BACKGROUND;
        resizeCanvas(windowWidth, windowHeight);
        break;
      case KEYS.TWO:
        mode = MODES.ANIMATED_OBJECT;
        resizeCanvas(windowWidth, windowHeight);
        break;
      case KEYS.THREE:
        mode = MODES.DRAW_MODE;
        resizeCanvas(windowWidth, windowHeight);
        break;
      case KEYS.FOUR:
        mode = MODES.PATTERN_GENERATION;
        resizeCanvas(windowWidth, windowHeight);
        break;
    }

    // If they aren't in draw mode we don't need to do any further checks so we move onto the next key
    if (mode != MODES.DRAW_MODE) {continue;}

    // If they pressed a draw mode switching key we change their current draw mode
    switch (key) {
      case KEYS.Q:
        currentDrawMode = DRAWMODES.SQUARE;
        break;
      case KEYS.W:
        currentDrawMode = DRAWMODES.CIRCLE;
        break;
      case KEYS.E:
        currentDrawMode = DRAWMODES.PENCIL;
        break;
      case KEYS.R:
        currentDrawMode = DRAWMODES.ERASER;
        break;
    }
  }

  // Draws whatever it's supposed to
  if (leftClickDown) {drawMode();}
}

/**
 * Returns a random RGB color
 * @returns ```number[]``` RGB color
 */
function getRandomColor() {return [random(255), random(255), random(255)];}

/**
 * Moves the circle based on its x and y speed
 */
function moveCircle() {
  Circle.x += Circle.xSpeed;
  Circle.y += Circle.ySpeed;
}

/**
 * Updates the animated circle and redraws it
 */
function updateAnimatedCircle() {
  moveCircle();

  if (Circle.x >= width || Circle.x <= 0) {
    console.log(getRandomColor());
    Circle.color = getRandomColor();
    Circle.xSpeed *= -1
  }

  if (Circle.y >= height || Circle.y <= 0) {
    Circle.color = getRandomColor();
    Circle.ySpeed *= -1;
  }


  fill(Circle.color);
  circle(Circle.x, Circle.y, Circle.diameter);
}

/**
 * Handles single key presses, used for increasing and decreasing stroke size to allow for fine tuning the stroke size
 */
function keyPressed() {
  if (key === '+') {
    drawSize++;
  } else if (key === '-') {
    drawSize = (drawSize - 1 <= 0) ? drawSize : drawSize - 1;
  }
}

/**
 * Draws whatever object the mode is currently set to draw
 */
function drawMode() {
  stroke(0, 0, 0);
  strokeWeight(0);

  switch (currentDrawMode) {
    case DRAWMODES.SQUARE:
      fill(getRandomColor());
      square(mouseX, mouseY, drawSize);
      break;
    case DRAWMODES.CIRCLE:
      fill(getRandomColor());
      circle(mouseX, mouseY, drawSize);
      break;
    case DRAWMODES.PENCIL:
      fill(0, 0, 0);
      square(mouseX, mouseY, drawSize);
      break;
    case DRAWMODES.ERASER:
      fill(backgroundColor);
      circle(mouseX, mouseY, drawSize);
      break;
  }
}
