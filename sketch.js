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
  }
}

/**
 * Displays the instructions for changing modes
 */
function displayInstructions() {
      // Draw a black box so we can see the instructions no matter what random colors are picked
    fill(0, 0, 0);
    rect(0,0, width, 50);

    fill(255, 255, 255);

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

        // we have to do the draw() logic here instead of in draw() because we can't clear the canvas every frame in pattern mode
        resizeCanvas(windowWidth, windowHeight);
        background(backgroundColor);
        patternMode();  // Draw the pattern
        displayInstructions();
        printPatternModeInstructions();

        break;
    }

    if (mode == MODES.DRAW_MODE) {

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

    } else if (mode == MODES.PATTERN_GENERATION) {

      // If they pressed a pattern mode switching key we change their current pattern mode and draw the pattern
      switch (key) {
        case KEYS.Q:
          currentPatternMode = PATTERNMODES.SQUARES;

          // Clear the canvas
          background(backgroundColor);

          // Draw the pattern
          patternMode();  

          displayInstructions();
          printPatternModeInstructions();
          break;
        case KEYS.W:
          currentPatternMode = PATTERNMODES.CIRCLES;

          // Clear the canvas
          background(backgroundColor);

          // Draw the pattern
          patternMode();  

          displayInstructions();
          printPatternModeInstructions();
          break;
      }
    }
  }

      // Draws whatever it's supposed to
    if (leftClickDown && mode == MODES.DRAW_MODE) {drawMode();}
}

/**
 * Returns a random RGB color
 * @returns ```number[]``` RGB color
 */
function getRandomColor() {return [random(255), random(255), random(255)];}