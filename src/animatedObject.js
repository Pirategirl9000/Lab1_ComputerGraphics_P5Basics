/**
 * @author Violet French
 * @see https://github.com/Pirategirl9000/Lab1_ComputerGraphics_P5Basics
 * @date 1-30-2026
 * @summary Contains the functions and objects necessary for the animated object mode of the program
 */

/**
 * Stores all the attributes related to the circle
 */
const Circle = {
  x: 0,
  y: 0,
  diameter: 20,
  xSpeed: 1,
  ySpeed: 1,
  color: [255, 255, 255]
}

/**
 * Moves the circle based on its x and y speed
 */
function moveCircle() {
  Circle.x += Circle.xSpeed;
  Circle.y += Circle.ySpeed;
}

/**
 * Updates the animated circle and redraws it
 */
function updateAnimatedCircle() {
  moveCircle();

  // Check to see if it hits a wall and randomize the color if it did
  if (Circle.x >= width || Circle.x <= 0) {
    Circle.color = getRandomColor();
    Circle.xSpeed *= -1
  }

  if (Circle.y >= height || Circle.y <= 0) {
    Circle.color = getRandomColor();
    Circle.ySpeed *= -1;
  }

  // Draw the circle
  fill(Circle.color);
  stroke(0, 0, 0);
  strokeWeight(1);
  circle(Circle.x, Circle.y, Circle.diameter);
}