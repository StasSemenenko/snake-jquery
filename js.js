let direction = 0;
let snake =[];

function createBody() {
	let body = $("<div></div>");
	body.addClass("snake");
	body.appendTo(".field");

	let pointStart = {
		x: 125,
		y: 125,
		part: body
	}

	snake.push(pointStart);

	body.css({
		left: pointStart.x + "px",
		top: pointStart.y + "px"
	});
}

function start(){
	for(let i = 0; i < 3; i++) {
		createBody();
	}
}

setInterval(function draw() {
	for(let i = snake.length - 1; i >= 0; i--){
		snake[i].css({
			"left": snake[i].x + "px"
		});
	}
}, 1000);


start();
