let direction = 0;
let snake =[];
let food = [];
const foodImg = new Image();
foodImg.src = "apple.png"; 
let items = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375];
let item = items[Math.floor(Math.random()*items.length)];
let lengthSnake = 3;
let point = items[Math.floor(Math.random()*items.length)];

function createBody() {
	let body = $("<div></div>");
	body.addClass("snake");
	body.appendTo(".field");

	let pointStart = {
		x: point,
		y: point,
		part: body
	}

	snake.push(pointStart);

	body.css({
		left: pointStart.x + "px",
		top: pointStart.y + "px"
	});
}

setInterval(function () {
	for(let i = snake.length - 1; i >= 0; i--){
		if(i == 0){
			if(direction == 0 )  snake[i].x += 25;
			if(direction == 1 ) snake[i].y -= 25;
			if(direction == 2 ) snake[i].x -= 25;
			if(direction == 3 ) snake[i].y += 25;
		}
		else {
			snake[i].x = snake[i - 1].x;
			snake[i].y = snake[i - 1].y;
		}
		if(snake[i].x >= 400){
			snake[i].x = 0;
		}
		if(snake[i].x < 0){
			snake[i].x = 375;
		}
		if(snake[i].y >= 400){
			snake[i].y = 0;
		}
		if(snake[i].y < 0){
			snake[i].y = 375;
		}
			snake[i].part.css({
				"left": snake[i].x + "px",
				"top": snake[i].y + "px"
			});
		}
			if(item == snake[0].x && item == snake[0].y){
				lengthSnake = lengthSnake + 1;
				console.log(lengthSnake);
				createBody();
			}	
}, 100);

function start(){
	for(let i = 0; i < lengthSnake; i++) {
		createBody();
	}
}

$(document).on("keydown",function (event) {
	let key = (event.keyCode ? event.keyCode : event.which);
	if(key == 68 && direction != 2){
		direction = 0;
	}
	if(key == 87 && direction != 3){
		direction = 1;
	}
	if(key == 65 && direction != 0){
		direction = 2;
	}
	if(key == 83 && direction != 1){
		direction = 3;
	}
});

function createApple() {
	let apple = $("<div></div>");
	apple.addClass("apple");
	apple.appendTo(".field");

	let randomPoint = {
		x: item,
		y: item,
		part: apple
	}
	
	food.push(randomPoint);

	apple.css({
		left: randomPoint.x + "px",
		top: randomPoint.y + "px"
	});
	
}

start();
createApple();

