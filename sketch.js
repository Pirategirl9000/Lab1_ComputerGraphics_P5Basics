
/**
 * An enum for assignment of modes in a manner that is self-documenting
 */
const Modes = {
  DYNAMIC_BACKGROUND: 0,
  ANIMATED_OBJECT: 1,
  MOUSE_INTERACT: 2,
  PATTERN_GENERATION: 3
};

/**
 * The background color for the canvas
 */
let backgroundColor = [255, 255, 255];

/**
 * The current mode for the program
 */
let mode = Modes.DYNAMIC_BACKGROUND;

/**
 * Creates the canvas for the program
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
}

/**
 * Renders the current background and any objects that must be drawn to screen
 */
function draw() {
  background(backgroundColor);
}

function resizeWindow() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * Handles any action that needs to result from a mouse movement
 */
function mouseMoved() {
  if (mode == Modes.DYNAMIC_BACKGROUND) {
    dynamicBackground();
  }


}

/**
 * Recalculates the new backgroundColor based on the mouse's position and windowHeight
 */
function dynamicBackground() {
  // We'll use mouseX and mouseY for red and blue respectively
  // We'll also use the windowHeight to give the user some control over the green value since there is no axis we can use for that
  // This gives the user full control over the color of the background
  backgroundColor = [windowWidth/mouseX, windowHeight, windowHeight/mouseY].map((pos) => pos % 256);
  console.log("MouseX: " + mouseX + "windowWidth: " + windowWidth);
}