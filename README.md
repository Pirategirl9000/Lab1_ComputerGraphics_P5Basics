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
            * Returns a random RGB color

* #### eventHandlers.js
    * Purpose
        * Handles p5 events like key presses, mouse movement, and window resizing
        * Also stores all the different [keys](#keys) used for input
    * Variables & Objects
        * ###### ```KEYS```
            * An enum storing all the different input types and their associated keys
            * Provides an easy way to change keybinds without massive refactoring
    * Functions
        * ###### ```windowResized```
            * p5 function that triggers when the window is resized
            * Resizes the canvas if in dynamic background mode
                * Only does it in this mode since it causes problems if done in other modes
                * Canvas is resized to match window dimensions
        * ###### ```mouseMoved```
            * p5 function that triggers when the mouse is moved
            * Used in [dynamic background mode](#dynamicbackgroundjs) to adjust the color according to the mouse position
        * ###### ```keyPressed```
            * p5 function that triggers when a key is pressed and released
            * Used for handling all keyboard events
            * Used for changing [```mode```](#mode), [```currentDrawMode```](#currentdrawmode), and [```currentPatternMode```](#currentpatternmode)
                * Also used for adjusting [```drawSize```](#drawsize) in draw mode

    
* #### dynamicBackground.js
    * Purpose
        * Handles all the logic pertaining to the dynamic background mode
            * Dynamic background changes the color of the background based on your mouse position
            * The x position changes the red value and the y value changes the blue value
                * green remains constant at 0
                * the value for the new color is calculated using
                    * $red \approx mouseX / windowWidth * 255 $
                    * $blue \approx mouseY / windowHeight * 255$
                    * Value is rounded to next whole integer
    * Variables & Objects
    * Functions

* #### animatedObject.js

* #### drawMode.js

* #### patternGenerations.js