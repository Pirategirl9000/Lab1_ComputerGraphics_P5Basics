# [P5 Basics](https://github.com/Pirategirl9000/Lab1_ComputerGraphics_P5Basics)
##### Author: [Violet French](https://github.com/Pirategirl9000)

---

### Purpose
This program is to learn the p5 library by creating several mini programs inside of one large program.

---

#### Included
* [Dynamic Background Mode](#dynamicbackgroundjs)
    * The background dynamically changes as you move your mouse across the screen
* [Object Animation Mode](#animatedobjectjs)
    * A circle bounces across the screen changing colors as it hits the walls
* [Draw Mode](#drawmodejs)
    * A mode which the user can draw in allowing for mouse interactivity
* [Pattern Mode](#patterngenerationsjs)
    * Draws patterns to the screen with alternating colors

For more information on each mode see the [script breakdown](#script-breakdown)

---

### Script Breakdown
* #### sketch.js
    * Purpose
        * Serves as the main function for the program
        * Handles most of the top level logic and declares variables and functions used by other scripts
    * Variables & Objects
        * ###### ```MODES```
            * An enum for all the different program modes
            * Contains: ```DYNAMIC_BACKGROUND```, ```ANIMATED_OBJECT```, ```DRAW_MODE```, and ```PATTERN_MODE```
        * ###### ```backgroundColor```
            * Stores the current background color
        * ###### ```mode```
            * The current mode of the program
    * Functions
        * ###### ```setup```
            * p5 function that is called at beginning of program
            * Sets ```Circle.color``` to a [random color](#getrandomcolor)
            * Creates the canvas
        * ###### ```draw```
            * p5 function that is called once every frame
            * Handles any logic that needs to happen every frame
                * Redraws backgrounds
                * Reprints instructions
                * Updates the circle's position
                * Checks for mouse inputs in draw mode
        * ###### ```displayInstructions```
            * Displays the instructions for changing modes
        * ###### ```getRandomColor```
            * Returns a random color
* #### eventHandlers.js

* #### dynamicBackground.js

* #### animatedObject.js

* #### drawMode.js

* #### patternGenerations.js