/**
 * @author Violet French
 * @see https://github.com/Pirategirl9000/Lab1_ComputerGraphics_P5Basics
 * @date 1-30-2026
 * @summary Contains functions used for the dynamicBackground mode of the program
 */

/**
 * Recalculates the new backgroundColor based on the mouse's position and window dimensions
 */
function dynamicBackground() {
  // Scales a value between [0, 1] to a value between [0, 255]
  const scaleToColor = (pos) => Math.round(pos * 255);

  // We'll use mouseX and mouseY for red and blue respectively
  const relativeXPos = mouseX / windowWidth;
  const relativeYPos = mouseY / windowHeight;

  // Set the color of the background using the relative mouse positions and scale it to [0, 255]
  backgroundColor = [relativeXPos, 0, relativeYPos].map(scaleToColor);
}

/**
 * Prints the current background color to the canvas
 */
function printBackgroundColor() {
    // Draw a black box so we can see the instructions no matter what random colors are picked
    fill(0, 0, 0);
    rect(0, windowHeight-20, width, 20);

    const textOut =`RGB(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`;
    fill(255, 255, 255)
    text(textOut, 0, windowHeight);
}