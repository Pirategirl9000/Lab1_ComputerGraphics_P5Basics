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
  if (mode == MODES.DYNAMIC_BACKGROUND) {
    background(backgroundColor);
    printBackgroundColor();
  } else if (mode == MODES.ANIMATED_OBJECT) {
    background(backgroundColor);
    updateAnimatedObject();
  } else if (mode == MODES.DRAW_MODE) {
    printDrawModeInstructions();
    drawMode();
  } else if (mode == MODES.PATTERN_GENERATION) {
    printPatternModeInstructions();
  }

  displayInstructions();
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
 * Returns a random RGB color
 * @returns ```number[]``` RGB color
 */
function getRandomColor() {return [random(255), random(255), random(255)];}