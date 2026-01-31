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