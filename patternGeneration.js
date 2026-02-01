const PATTERNMODES = {
    SQUARES: "Q",
    CIRCLES: "W",
}

const shapeSize = 20;

let currentPatternMode = PATTERNMODES.SQUARES;

function patternMode() {
    switch(currentPatternMode) {
        case PATTERNMODES.SQUARES:
            drawSquarePattern();
            break;
        case PATTERNMODES.CIRCLES:
            drawCirclePattern();
            break;
    }
}

function drawSquarePattern() {
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