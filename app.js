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
const MOVE_NONE = -1, MOVE_LEFT = 0, MOVE_UP_LEFT = 1,MOVE_UP_RIGHT=2, MOVE_RIGHT = 3,MOVE_DOWN_RIGHT = 4,MOVE_DOWN_LEFT =5;

function getMoveDir(cat){
	let distanceMap = [];
	//向左移动
	let move = true;
	for(let x = cat.indexX;x>0;x--){
		if(circleArr[x][cat.indexY].getCircleType == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_LEFT] = cat.indexX - x;
			break
		}
	}
	if(move){
		return MOVE_LEFT;
	}
	//左上移动
	move = true;
	let x = cat.indexX, y=cat.indexY;
	while(true){
		if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_UP_LEFT] = cat.indexY - y;
			break;
		}
		if(y%2 == 0){
			x--;
		}
		y--;
		if(x<0|| y< 0){
			break;
		}
	}
	if(move){
		return MOVE_UP_LEFT;
	}
	//右上
	move = true;
	x = cat.indexX, y=cat.indexY;
	while(true){
		if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_UP_RIGHT] = cat.indexY - y;
			break;
		}
		if(y%2 == 0){
			x--;
		}
		y--;
		if( x>8|| y< 0){
			break;
		}
	}
	if(move){
		return MOVE_UP_RIGHT;
	}
	//向右移动
	let move = true;
	for(let x = cat.indexX;x<9;x++){
		if(circleArr[x][cat.indexY].getCircleType == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_RIGHT] = x - cat.indexX;
			break
		}
	}
	if(move){
		return MOVE_RIGHT;
	}
	//右下
	move = true;
	x = cat.indexX, y=cat.indexY;
	while(true){
		if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_DOWN_RIGHT] = y - cat.indexY;
			break;
		}
		if(y%2 == 0){
			x++;
		}
		y++;
		if( x>8|| y > 8){
			break;
		}
	}
	if(move){
		return MOVE_DOWN_RIGHT;
	}
	//左下
	move = true;
	x = cat.indexX, y=cat.indexY;
	while(true){
		if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_DOWN_LEFT] = y - cat.indexY;
			break;
		}
		if(y%2 == 0){
			x--;
		}
		y++;
		if( x<0|| y > 8){
			break;
		}
	}
	if(move){
		return MOVE_DOWN_LEFT;
	}		
}


function circleEvent(event) {
    if (event.target.getCircleType() != Circle.TYPE_CAT) {
        event.target.setCircleType(Circle.TYPE_SELECTED)
        return
    }
    if (currcat.indexX == 0 || currcat.indexY == 0 || currcat.indexX == 8 || currcat.indexY == 8) {
        alert('游戏结束');
        return;
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