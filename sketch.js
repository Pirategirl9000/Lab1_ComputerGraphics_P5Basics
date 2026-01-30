
/**
 * An enum for assignment of modes in a manner that is self-documenting
 */
const MODES = {
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
let mode = MODES.DYNAMIC_BACKGROUND;

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
  if (mode == MODES.DYNAMIC_BACKGROUND) {
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
  if (mode == MODES.DYNAMIC_BACKGROUND) {
    dynamicBackground();
  }
}

/**
 * Recalculates the new backgroundColor based on the mouse's position and window dimensions
 */
function dynamicBackground() {
  // This will be used to map the mouse position to bounded RGB values
  const bound = (pos) => Math.round((pos * 256) % 256);

  // We'll use mouseX and mouseY for red and blue respectively
  const relativeXPos = mouseX / windowWidth;
  const relativeYPos = mouseY / windowHeight;

  // Set the color of the background using the relative mouse positions and bound it to [0, 255]
  backgroundColor = [relativeXPos, 0, relativeYPos].map(bound);
}

/**
 * Prints the current background color to the canvas
 */
function printBackgroundColor() {
    const textOut =`RGB(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`;
    fill(255)
    text(textOut, 0, 10);
}