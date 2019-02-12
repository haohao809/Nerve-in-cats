let stage = new createjs.Stage("gameView");
let gameView = new createjs.Container();
stage.addChild(gameView);

// let s = new createjs.Shape();
// s.graphics.beginFill("#FF0000");
// s.graphics.drawCircle(50,50,25);
// s.graphics.endFill();
// gameView.addChild(s);

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage) 

let circleArr = [[],[],[],[],[],[],[],[],[]];

function addCircles(){
	for(let indexY=0; indexY<9; indexY++){
		for(let indexX = 0; indexX<9; indexX++){
			let c = new Circle();
			gameView.addChild(c);
			circleArr[indexX][indexY] = c;
			c.x = indexX*55;
			c.y = indexY*55;
		}
	}
}
addCircles();
