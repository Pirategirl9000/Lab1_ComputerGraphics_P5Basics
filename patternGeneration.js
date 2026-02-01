/**
 * @author Violet French
 * @see https://github.com/Pirategirl9000/Lab1_ComputerGraphics_P5Basics
 * @date 1-31-2026
 * @summary Handles all variables and functions related to patternGeneration mode
 */

/**
 * The different types of patterns in pattern mode
 */
const PATTERNMODES = {
    VERTSQUARES: "Q",
    HORSQUARES: "W",
    CIRCLES: "E"
}

/**
 * The size of each shape in the pattern
 */
const shapeSize = 20;

/**
 * The current pattern to draw
 */
let currentPatternMode = PATTERNMODES.HORSQUARES;

/**
 * Delegates work to the pattern drawing function associated with the ```currentPatternMode```
 */
function patternMode() {
    switch(currentPatternMode) {
        case PATTERNMODES.HORSQUARES:
            drawVertSquarePattern();
            break;
        case PATTERNMODES.VERTSQUARES:
            drawHorSquarePattern();
            break;
        case PATTERNMODES.CIRCLES:
            drawCirclePattern();
            break;
    }
}

/**
 * Draws a pattern of squares with alternating colors whose colors align vertically
 */
function drawVertSquarePattern() {
    stroke(0, 0, 0);
    strokeWeight(1);

    // Each time you switch to this mode we give it a new pattern
    const colorOne = getRandomColor();
    const colorTwo = getRandomColor();

    // Draw left to right
    for (let i = 0; i < height; i += shapeSize) {
        for (let j = 0; j < width; j += shapeSize) {
            fill(colorOne);
            square(j, i, shapeSize);
            j += shapeSize;
            fill(colorTwo);
            square(j, i, shapeSize);
        }
    }
}

/**
 * Draws a pattern of squares with alternating colors whose colors align horizontally
 */
function drawHorSquarePattern() {
    stroke(0, 0, 0);
    strokeWeight(1);

    // Each time you switch to this mode we give it a new pattern
    const colorOne = getRandomColor();
    const colorTwo = getRandomColor();

    // Draw up to down
    for (let i = 0; i < width; i += shapeSize) {
        for (let j = 0; j < height; j += shapeSize) {
            fill(colorOne);
            square(i, j, shapeSize);
            j += shapeSize;
            fill(colorTwo);
            square(i, j, shapeSize);
        }
    }
}

/**
 * Draws a pattern of circles with alternating colors whose colors align vertically
 */
function drawCirclePattern() {
    stroke(0, 0, 0);
    strokeWeight(1);

    // Each time you switch to this mode we give it a new pattern
    const colorOne = getRandomColor();
    const colorTwo = getRandomColor();

    // Draw left to right
    for (let i = shapeSize / 2; i < height; i += shapeSize) {
        for (let j = 0; j < width; j += shapeSize) {
            fill(colorOne);
            circle(j, i, shapeSize);
            j += shapeSize;
            fill(colorTwo);
            circle(j, i, shapeSize);
        }
    }
}

/**
 * Prints the instructions for pattern mode in the bottom left
 */
function printPatternModeInstructions() {
    let position = 0;

    // Draw a black box so we can see the instructions no matter what random colors are picked
    fill(0, 0, 0);
    rect(0, windowHeight-20, width, 20);

    fill(255, 255, 255);

    // Show the instructions for draw mode in the bottom left
    for ([key, value] of Object.entries(PATTERNMODES)){
        let instruction = `${key}: ${value}`;

        // Grab the capitilized first character, grab the other characters in lowercase, then grab the last character in its capital form
        instruction = instruction.charAt(0) + instruction.substring(1, instruction.length-1).toLowerCase() + instruction.charAt(instruction.length - 1);

        text(instruction, position * 95, windowHeight);
        position++;
    }

    // Give an instruction outside the enum for how to clear the canvas
    text("New Pattern: 4", position * 95, windowHeight);
}