let stage = new createjs.Stage("gameView");
let gameView = new createjs.Container();
gameView.x = 48;
gameView.y = 48;
stage.addChild(gameView);
var bitmap = new createjs.Bitmap("../Nerve-in-cats/image/cat.gif");

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
const MOVE_NONE = -1,
    MOVE_LEFT = 0,
    MOVE_UP_LEFT = 1,
    MOVE_UP_RIGHT = 2,
    MOVE_RIGHT = 3,
    MOVE_DOWN_RIGHT = 4,
    MOVE_DOWN_LEFT = 5;

function getMoveDir(cat) {
    let distanceMap = [];
    //向左移动
    let move = true;
    for (let x = cat.indexX; x >= 0; x--) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            move = false;
            distanceMap[MOVE_LEFT] = cat.indexX - x;
            break
        }
    }
    if (move) {
        return MOVE_LEFT;
    }
    //左上移动
    move = true;
    let x = cat.indexX,
        y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            move = false;
            distanceMap[MOVE_UP_LEFT] = cat.indexY - y;
            break;
        }
        if (y % 2 == 0) {
            x--;
        }
        y--;
        if (x < 0 || y < 0) {
            break;
        }
    }
    if (move) {
        return MOVE_UP_LEFT;
    }
    //右上
    move = true;
    x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            move = false;
            distanceMap[MOVE_UP_RIGHT] = cat.indexY - y;
            break;
        }
        if (y % 2 == 0) {
            x--;
        }
        y--;
        if (x > 8 || y < 0) {
            break;
        }
    }
    if (move) {
        return MOVE_UP_RIGHT;
    }
    //向右移动
    move = true;
    for (let x = cat.indexX; x < 9; x++) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            move = false;
            distanceMap[MOVE_RIGHT] = x - cat.indexX;
            break
        }
    }
    if (move) {
        return MOVE_RIGHT;
    }
    //右下
    move = true;
    x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            move = false;
            distanceMap[MOVE_DOWN_RIGHT] = y - cat.indexY;
            break;
        }
        if (y % 2 == 0) {
            x++;
        }
        y++;
        if (x > 8 || y > 8) {
            break;
        }
    }
    if (move) {
        return MOVE_DOWN_RIGHT;
    }
    //左下
    move = true;
    x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            move = false;
            distanceMap[MOVE_DOWN_LEFT] = y - cat.indexY;
            break;
        }
        if (y % 2 == 0) {
            x--;
        }
        y++;
        if (x < 0 || y > 8) {
            break;
        }
    }
    if (move) {
        return MOVE_DOWN_LEFT;
    }
}


function circleEvent(event) {
    if (event.target.getCircleType() != Circle.TYPE_CAT) {
        event.target.setCircleType(Circle.TYPE_SELECTED)

    } else {
        return;
    }
    if (currcat.indexX == 0 || currcat.indexY == 0 || currcat.indexX == 8 || currcat.indexY == 8) {
        alert('游戏结束');
        return;
    }
    let dir = getMoveDir(currcat);
    switch (dir) {
        case MOVE_LEFT:
            currcat.setCircleType(Circle.TYPE_UNSELECTED);
            currcat = circleArr[currcat.indexX - 1][currcat.indexY];
            currcat.setCircleType(Circle.TYPE_CAT);
            gameView.removeChild(bitmap);
            // bitmap.x = (currcat.indexX - 1) * 25;
            // console.log('MOVE_LEFT', currcat.indexX);
            // console.log('MOVE_LEFT', currcat.indexY);
            break;
        case MOVE_UP_LEFT:
            currcat.setCircleType(Circle.TYPE_UNSELECTED);
            currcat = circleArr[currcat.indexY % 2 ? currcat.indexX : currcat.indexX - 1][currcat.indexY - 1];
            currcat.setCircleType(Circle.TYPE_CAT);
            // gameView.addChild(bitmap);
            // bitmap.x = (currcat.indexY % 2 ? currcat.indexX : currcat.indexX - 1) * 25;
            // bitmap.y = (currcat.indexY - 1) * 25;
            // console.log('MOVE_UP_LEFT', currcat.indexX);
            // console.log('MOVE_UP_LEFT', currcat.indexY);
            break;
        case MOVE_UP_RIGHT:
            currcat.setCircleType(Circle.TYPE_UNSELECTED);
            currcat = circleArr[currcat.indexY % 2 ? currcat.indexX + 1 : currcat.indexX][currcat.indexY - 1];
            currcat.setCircleType(Circle.TYPE_CAT);
            // gameView.addChild(bitmap);
            // bitmap.x = (currcat.indexY % 2 ? currcat.indexX + 1 : currcat.indexX) * 25;
            // bitmap.y = (currcat.indexY - 1) * 25;

            break;
        case MOVE_RIGHT:
            currcat.setCircleType(Circle.TYPE_UNSELECTED);
            currcat = circleArr[currcat.indexX + 1][currcat.indexY];
            currcat.setCircleType(Circle.TYPE_CAT);
            // gameView.addChild(bitmap);
            break;
        case MOVE_DOWN_RIGHT:
            currcat.setCircleType(Circle.TYPE_UNSELECTED);
            currcat = circleArr[currcat.indexY % 2 ? currcat.indexX + 1 : currcat.indexX][currcat.indexY + 1];
            currcat.setCircleType(Circle.TYPE_CAT);
            // gameView.addChild(bitmap);
            break;
        case MOVE_DOWN_LEFT:
            currcat.setCircleType(Circle.TYPE_UNSELECTED);
            currcat = circleArr[currcat.indexY % 2 ? currcat.indexX : currcat.indexX - 1][currcat.indexY + 1];
            currcat.setCircleType(Circle.TYPE_CAT);
            // gameView.addChild(bitmap);
            break;
        default:
            alert("游戏结束了");
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
            c.x = indexY % 2 ? indexX * 102 + 50 : indexX * 102;
            c.y = indexY * 102;

            if (indexX == 4 && indexY == 4) {
                c.setCircleType(3);
                currcat = c;
                bitmap.x = indexX * 50 + 27;
                bitmap.y = indexY * 50 + 27;
                gameView.addChild(bitmap);
            }
            c.addEventListener("click", circleEvent);
        }
    }
}
addCircles();