const PATTERNMODES = {
    SQUARES: "Q",
    CIRCLES: "W",
}

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

}

function drawCirclePattern() {

}