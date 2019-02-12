let stage = new createjs.Stage("gameView");
let gameView = new createjs.Container();
gameView.x = 30;
gameView.y = 30;
stage.addChild(gameView);

// let s = new createjs.Shape();
// s.graphics.beginFill("#FF0000");
// s.graphics.drawCircle(50,50,25);
// s.graphics.endFill();
// gameView.addChild(s);

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage)

let circleArr = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
let currcat;
function circleEvent(event) {
    if (event.target.getCircleType() != 3) {
        event.target.setCircleType(2)
    }
    if(currcat.indexX == 0 || currcat.indexY == 0 || currcat.indexX == 8 || currcat.indexY ==8){
    	alert('游戏结束')
    }
    let leftCircle = circleArr[currcat.indexX -1][currcat.indexY];
    if(leftCircle.getCircleType() == 1){
    	leftCircle.setCircleType(3);
    	currcat.setCircleType(1);
    	currcat  = leftCircle;
    }
}

function addCircles() {
    for (let indexY = 0; indexY < 9; indexY++) {
        for (let indexX = 0; indexX < 9; indexX++) {
            let c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY] = c;
            c.indexX = indexX;
            c.indexY = indexY;
            c.x = indexY % 2 ? indexX * 55 + 25 : indexX * 55;
            c.y = indexY * 55;

            if (indexX == 4 && indexY == 4) {
                c.setCircleType(3);
                currcat = c;
            }
            c.addEventListener("click", circleEvent);
        }
    }
}
addCircles();