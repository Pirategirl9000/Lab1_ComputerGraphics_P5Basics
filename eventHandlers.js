/**
 * @author Violet French
 * @see https://github.com/Pirategirl9000/Lab1_ComputerGraphics_P5Basics
 * @date 1-30-2026
 * @summary Contains the different p5 event handling functions for the program
 */

const KEYS = {
  DYNAMIC_BACKGROUND: "1",
  ANIMATED_OBJECT: "2",
  DRAW_MODE: "3",
  PATTERN_GENERATION: "4",
  INCREASE_STROKE: "+",
  DECREASE_STROKE: "-",
  SQUARE_DRAW: "q",
  CIRCLE_DRAW: "w",
  PENCIL_DRAW: "e",
  ERASER_DRAW: "r",
  HORIZONTAL_SQUARE_PATTERN: "q",
  VERTICAL_SQUARE_PATTERN: "w",
  CIRCLE_PATTERN: "e"
}

/**
 * Triggers when the window is resized, resizes the canvas in accordance
 */
function windowResized() {
  // We don't resize when in ANIMATED_OBJECT because then the ball gets stuck off screen
  // We don't resize when in DRAW_MODE because this clears the canvas and all the instructions
  // We don't resize when in PATTERN_GENERATION because this skews the appearence of the pattern with whitespace.
  if (mode != MODES.DYNAMIC_BACKGROUND) {return};
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

  // Check mode change inputs
  switch (key) {
      case KEYS.DYNAMIC_BACKGROUND:
        mode = MODES.DYNAMIC_BACKGROUND;
        resizeCanvas(windowWidth, windowHeight);
        break;
      case KEYS.ANIMATED_OBJECT:
        mode = MODES.ANIMATED_OBJECT;
        resizeCanvas(windowWidth, windowHeight);
        break;
      case KEYS.DRAW_MODE:
        mode = MODES.DRAW_MODE;

        // we have to do the draw() logic here instead of in draw() because we can't clear the canvas every frame in draw mode
        resizeCanvas(windowWidth, windowHeight);
        background(backgroundColor);
        break;
      case KEYS.PATTERN_GENERATION:
        mode = MODES.PATTERN_GENERATION;
        break;
    }



  // Check draw mode inputs
  if (mode == MODES.DRAW_MODE) {
    switch (key) {
      case KEYS.INCREASE_STROKE:
        drawSize++;
        break;
      case KEYS.DECREASE_STROKE:
        drawSize = (drawSize - 1 <= 0) ? drawSize : drawSize - 1;
        break;
      case KEYS.SQUARE_DRAW:
        currentDrawMode = DRAWMODES.SQUARE;
        break;
      case KEYS.CIRCLE_DRAW:
        currentDrawMode = DRAWMODES.CIRCLE;
        break;
      case KEYS.PENCIL_DRAW:
        currentDrawMode = DRAWMODES.PENCIL;
        break;
      case KEYS.ERASER_DRAW:
        currentDrawMode = DRAWMODES.ERASER;
        break;
    }
  }

  
  // Check pattern mode inputs and perform logic for refreashing screen
  if (mode == MODES.PATTERN_GENERATION) {

    // If they pressed a pattern mode switching key we change their current pattern mode and draw the pattern
    switch (key) {
      case KEYS.HORIZONTAL_SQUARE_PATTERN:
        currentPatternMode = PATTERNMODES.HORSQUARES;
        break;
      case KEYS.VERTICAL_SQUARE_PATTERN:
        currentPatternMode = PATTERNMODES.VERTSQUARES;
        break;
      case KEYS.CIRCLE_PATTERN:
        currentPatternMode = PATTERNMODES.CIRCLES;
        break;
    }

    
    // Clear the canvas
    resizeCanvas(windowWidth, windowHeight);
    background(backgroundColor);


    // Draw the pattern
    patternMode();  

    displayInstructions();
    printPatternModeInstructions();
  }
}