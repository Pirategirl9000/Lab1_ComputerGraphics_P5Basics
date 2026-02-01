/**
 * @author Violet French
 * @see https://github.com/Pirategirl9000/Lab1_ComputerGraphics_P5Basics
 * @date 1-30-2026
 * @summary Contains relevant variables and functions for the drawMode(mouse interaction) of the application
 */

/**
 * An enum for assignment of drawing modes for MOUSE_INTERACT mode
 */
const DRAWMODES = {
  SQUARE: "Q",  // Draw squares where you click
  CIRCLE: "W",  // Draw cricles where you click
  PENCIL: "E",  // Draw tiny rectangles the size of a pixel where you click
  ERASER: "R"   // Draw small circles with color that matches the background where you click
}

/**
 * Current draw mode for the program, identifies what will be drawn on mouse down when in draw mode
 */
let currentDrawMode = DRAWMODES.SQUARE;

/**
 * The current drawSize for all drawings, affects shape size and stroke size (pencil & eraser)
 */
let drawSize = 20;

/**
 * Draws whatever object the mode is currently set to draw
 */
function drawMode() {
  stroke(0, 0, 0);
  strokeWeight(0);

  // Draw the shape for whatever draw mode we are in
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

/**
 * Displays instructions for draw mode
 */
function printDrawModeInstructions() {
  let position = 0;

  // Draw a black box so we can see the instructions no matter what background is used
  fill(0, 0, 0);
  rect(0, windowHeight-20, width, 20);

  fill(255, 255, 255);

  // Show the instructions for draw mode in the bottom left
  for ([key, value] of Object.entries(DRAWMODES)){
    let instruction = `${key}: ${value}`;

    // Grab the capitilized first character, grab the other characters in lowercase, then grab the last character in its capital form
    instruction = instruction.charAt(0) + instruction.substring(1, instruction.length-1).toLowerCase() + instruction.charAt(instruction.length - 1);

    text(instruction, position * 75, windowHeight);
    position++;
  }

  // Give an instruction outside the enum for how to clear the canvas
  text("Clear: 3", position * 75, windowHeight);
}