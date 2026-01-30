
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

  // Render this in draw so it doesn't get wiped when they stop moving their mouse
  if (mode == Modes.DYNAMIC_BACKGROUND) {
    printBackgroundColor();
  }


}

/**
 * Triggers when the window is resized, resizes the canvas in accordance
 */
function windowResized() {
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
  backgroundColor = [mouseX / windowWidth, 0, mouseY / windowHeight].map((pos) => Math.round((pos * 256) % 256));
}

/**
 * Prints the current background color to the canvas
 */
function printBackgroundColor() {
    const textOut =`RGB(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`;
    fill(255)
    text(textOut, 0, 10);
}