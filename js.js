let direction = 0;
let snake =[];
let food = {
	x: randomCoord(),
	y: randomCoord()
};

let heighScore = Number(localStorage.heighScore);
let score = 0;
let setInt = setInterval(tick, 100);
let lengthSnake = 3;
// let speed = 2;

function randomCoord(){
	let random = Math.random() * 400;
	return Math.floor(random / 25) * 25;
}

function createBody() {
	let body = $("<div></div>");
	body.addClass("snake");
	body.appendTo(".field");
	let x = y = 0;
	if(snake.length == 0) {
		x = randomCoord();
		y = randomCoord();
	}
	else {
		x = snake[snake.length - 1].x;
		y = snake[snake.length - 1].y;
	}

	let pointStart = {
		x,
		y,
		part: body
	}

	snake.push(pointStart);

	body.css({
		left: pointStart.x + "px",
		top: pointStart.y + "px"
	});
}

function tick() {
	for(let i = snake.length - 1; i >= 0; i--){
		if(i == 0){
			if(direction == 0) snake[i].x += 25;
			if(direction == 1) snake[i].y -= 25;
			if(direction == 2) snake[i].x -= 25;
			if(direction == 3) snake[i].y += 25;
			for(let b in snake){
				if(b == 0){
					continue;
				}	
				if(snake[0].x == snake[b].x && snake[0].y == snake[b].y){
					for(let s = b; s < snake.length; s++){
						snake[s].part.addClass("crash");
						$(".lose").addClass("show");
						clearInterval(setInt);
					}
					break;
				}
			}
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
	if(food.x == snake[0].x && food.y == snake[0].y){
		createBody();
		moveApple();
		score += 1;
		if(score > heighScore){
			heighScore = score;
			localStorage.heighScore = heighScore;
		}
		drowScore();
	}		
}

function drowScore(){
	$(".heighScore").html(heighScore);
	$(".score").html(score);
}

function start(){
	for(let i = 0; i < 3; i++) {
		createBody();
	}
	moveApple();
	handlers();
	drowScore();
}

function handlers(){
	$(".easy").click(function(){
		console.log("easy");
		speed = 1;
		clearInterval(setInt);
		setInt = setInterval(tick, 100 / speed);
	});
	$(".medium").click(function(){
		console.log("medium");
		speed = 4;
		clearInterval(setInt);
		setInt = setInterval(tick, 100 / speed);
	});
	$(".hard").click(function(){
		console.log("hard");
		speed = 6;
		clearInterval(setInt);
		setInt = setInterval(tick, 100 / speed);
	});
	$(".pause").click(function(){
		clearInterval(setInt);
	});
	$(".restart").click(function(){
		document.location.reload();
	});
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

function moveApple() {
	food.x = randomCoord();
	food.y = randomCoord();

	$(".apple").css({
		left: food.x + "px",
		top: food.y + "px"
	});
	
}

start();


