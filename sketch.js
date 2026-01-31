/**
 * @author Violet French
 * @see https://github.com/Pirategirl9000/Lab1_ComputerGraphics_P5Basics
 * @date 1-30-2026
 * @summary This program contains several mini-programs written with the intention of learning the p5 library
 */


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
 * The background color for the canvas
 */
let backgroundColor = [255, 255, 255];

/**
 * The current mode for the program
 */
let mode = MODES.DYNAMIC_BACKGROUND;

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
}

/**
 * Triggers when the window is resized, resizes the canvas in accordance
 */
function windowResized() {
  // We don't resize when in ANIMATED_OBJECT because then the ball gets stuck off screen
  // We don't resize when in DRAW_MODE because this clears the canvas and all the instructions
  if (mode == MODES.ANIMATED_OBJECT || mode == MODES.DRAW_MODE) {return};
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
  // Contrast the text against the background
  // Thanks to https://www.geeksforgeeks.org/javascript/how-to-compare-two-arrays-in-javascript/ for providing a quick way to compare arrays
  if (JSON.stringify(backgroundColor) == JSON.stringify([255,255,255])) {
    fill(0, 0, 0);
  } else {
    fill(255, 255, 255);
  }

  text("Press the number key of the mode you would like to select(default = 1)", 0, 20);
  
  // Iterate through every mode and print an instruction based on the MODES enum
  for ([key, value] of Object.entries(MODES)) {
    let instruction = `${key}: ${value}`;

    // Reformat instruction to be properly capitilized and not all caps and replace underscores with spaces
    instruction = instruction.charAt(0).toUpperCase() + instruction.substring(1, instruction.length).toLowerCase().replace("_", " ");

    text(instruction, (value-1)*250, 40);
  }
  
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

        // we have to do the draw() logic here instead of in draw() because we can't clear the canvas every frame in draw mode
        resizeCanvas(windowWidth, windowHeight);
        background(backgroundColor);
        displayInstructions();
        printDrawModeInstructions();
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
 * Handles single key presses, used for increasing and decreasing stroke size to allow for fine tuning the stroke size
 */
function keyPressed() {
  // We use seperate logic for increasing and decreasing stroke size than the rest of the inputs since it allows for fine tuning of your stroke size
  if (key === '+') {
    drawSize++;
  } else if (key === '-') {
    drawSize = (drawSize - 1 <= 0) ? drawSize : drawSize - 1;
  }
}