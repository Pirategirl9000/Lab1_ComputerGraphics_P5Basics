/**
 * @author Violet French
 * @see https://github.com/Pirategirl9000/Lab1_ComputerGraphics_P5Basics
 * @date 1-30-2026
 * @summary Contains the different p5 event handling functions for the program
 */

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