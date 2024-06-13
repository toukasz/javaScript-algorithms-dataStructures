//SNAKE GAME

process.stdout.write('\x1Bc');

const readline = require('readline');
const rl = readline.createInterface
({
	input: process.stdin,
	output: process.stdout
});

process.stdin.on('keypress', (str, key) =>
{
	if (str === 'p')
	{
		if (!started)
		{
			setInterval(timed, tickLength);
			started = true;
		}
	} 

	if (str === 'q')
	{
		process.exit();
	}

	if (str === 'w')
	{
		if (!pressed)
		{
			if (snake[3] == 2)
			{
				snake[3] = 2;
			}

			else
			{
				snake[3] = 0;
			}

			pressed = true;
		}
	}

	if (str === 'd')
	{
		if (!pressed)
		{
			if (snake[3] == 3)
			{
				snake[3] = 3;
			}

			else
			{
				snake[3] = 1;
			}

			pressed = true;
		}
	}

	if (str === 's')
	{
		if (!pressed)
		{
			if (snake[3] == 0)
			{
				snake[3] = 0;
			}

			else
			{
				snake[3] = 2;
			}

			pressed = true;
		}
	}

	if (str === 'a')
	{
		if (!pressed)
		{
			if (snake[3] == 1)
			{
				snake[3] == 1;
			}

			else
			{
				snake[3] = 3;
			}

			pressed = true;
		}
	}
});


const height = 10;
const width = 15;
const ascii = [" .", "[]", " @"];



var snake = [Math.floor(height / 2), Math.floor(width / 2), 3, 0]; // [height, width, size, direction]
const tickLength = 300;
const fruitDuration = 20;


var gameArea = [];

for (let indexHeight = 0; indexHeight < height; indexHeight++)
{
	gameArea.push([]);

	for (let indexWidth = 0; indexWidth < width; indexWidth++)
	{
		gameArea[indexHeight].push(0);
	}
}

function indexToAscii(index)
{
	if (index == 0)
	{
		return ascii[0];
	}

	if (index > 0)
	{
		return ascii[1];
	}

	if (index < 0)
	{
		return ascii[2];
	}
}

function print(array)
{
	process.stdout.write('\n')

	for (let indexHeight = 0; indexHeight < array.length; indexHeight++)
	{
		process.stdout.write('	');

		for (let indexWidth = 0; indexWidth < array[0].length; indexWidth++)
		{
			process.stdout.write(indexToAscii(array[indexHeight][indexWidth]));
		}

		process.stdout.write('\n');
	}
}

function randomArray(array)
{
	for (let indexHeight = 0; indexHeight < array.length; indexHeight++)
	{
		for (let indexWidth = 0; indexWidth < array[0].length; indexWidth++)
		{
			array[indexHeight][indexWidth] = Math.round(Math.random() * 100);
		}
	}
}

function countdown(array)
{
	for (let indexHeight = 0; indexHeight < array.length; indexHeight++)
	{
		for (let indexWidth = 0; indexWidth < array[0].length; indexWidth++)
		{
			if (array[indexHeight][indexWidth] > 0)
			{
				array[indexHeight][indexWidth] = array[indexHeight][indexWidth] - 1;
			}
		}
	}
}

function updateSnakePosition(position, array)
{
	if (position[3] == 0)
	{
		if (position[0] == 0)
		{
			array[array.length - 1][position[1]] = position[2];
			position[0] = array.length - 1;
		}

		else
		{
			array[position[0] - 1][position[1]] = position[2];
			position[0] = position[0] - 1;
		}

		return 0;
	}

	if (position[3] == 1)
	{
		if (position[1] == array[0].length - 1)
		{
			array[position[0]][0] = position[2];
			position[1] = 0;
		}

		else
		{
			array[position[0]][position[1] + 1] = position[2];
			position[1] = position[1] + 1;
		}

		return 1;
	}

	if (position[3] == 2)
	{
		if (position[0] == array.length - 1)
		{
			array[0][position[1]] = position[2];
			position[0] = 0;
		}

		else
		{
			array[position[0] + 1][position[1]] = position[2];
			position[0] = position[0] + 1;
		}

		return 2;
	}

	if (position[3] == 3)
	{
		if (position[1] == 0)
		{
			array[position[0]][array[0].length - 1] = position[2];
			position[1] = array[0].length - 1;
		}

		else
		{
			array[position[0]][position[1] - 1] = position[2];
			position[1] = position[1] - 1;
		}

		return 3;
	}
}

function checkCollision(position, array)
{
	if // no collision edge case
	(
		position[3] == 0 && position[0] == 0 && array[array.length - 1][position[1]] == 0 ||
		position[3] == 1 && position[1] == array[0].length - 1 && array[position[0]][0] == 0 ||
		position[3] == 2 && position[0] == array.length - 1 && array[0][position[1]] == 0 ||
		position[3] == 3 && position[1] == 0 && array[position[0]][array[0].length - 1] == 0
	)
	{
		return;
	}

	if // collision edge case
	(
		position[3] == 0 && position[0] == 0 && array[array.length - 1][position[1]] > 0 ||
		position[3] == 1 && position[1] == array[0].length - 1 && array[position[0]][0] > 0 ||
		position[3] == 2 && position[0] == array.length - 1 && array[0][position[1]] > 0 ||
		position[3] == 3 && position[1] == 0 && array[position[0]][array[0].length - 1] > 0
	)
	{
		endGame(score);
	}

	if // collision with fruit edge case
	(
		position[3] == 0 && position[0] == 0 && array[array.length - 1][position[1]] < 0 ||
		position[3] == 1 && position[1] == array[0].length - 1 && array[position[0]][0] < 0 ||
		position[3] == 2 && position[0] == array.length - 1 && array[0][position[1]] < 0 ||
		position[3] == 3 && position[1] == 0 && array[position[0]][array[0].length - 1] < 0
	)
	{
		position[2] = position[2] + 1;
	}

	if // collision regular case
	(
		position[3] == 0 && array[position[0] - 1][position[1]] > 0 ||
		position[3] == 1 && array[position[0]][position[1] + 1] > 0 ||
		position[3] == 2 && array[position[0] + 1][position[1]] > 0 ||
		position[3] == 3 && array[position[0]][position[1] - 1] > 0
	)
	{
		endGame(score);
	}

	if // collision with fruit regular case
	(
		position[3] == 0 && array[position[0] - 1][position[1]] < 0 ||
		position[3] == 1 && array[position[0]][position[1] + 1] < 0 ||
		position[3] == 2 && array[position[0] + 1][position[1]] < 0 ||
		position[3] == 3 && array[position[0]][position[1] - 1] < 0
	)
	{
		position[2] = position[2] + 1;
	}
}

function dropFruit(array)
{
	for (let indexHeight = 0; indexHeight < array.length; indexHeight++)
	{
		for (let indexWidth = 0; indexWidth < array[0].length; indexWidth++)
		{
			if (array[indexHeight][indexWidth] < 0)
			{
				array[indexHeight][indexWidth] = array[indexHeight][indexWidth] + 1;
				return;
			}
		}
	}

	let indexHeight = Math.floor(Math.random() * array.length)
	let indexWidth = Math.floor(Math.random() * array[0].length)

	if (array[indexHeight][indexWidth] > 0)
	{
		dropFruit(array);
		return;
	}

	array[indexHeight][indexWidth] = -1 * fruitDuration;
}

var score = snake[2];

function printScore(score)
{
	score = snake[2] - 3;
	console.log('\n	Score: ' + score);
}

function endGame(score)
{
	console.log('\n	Score: ' + score);
	process.exit();
}


process.stdout.write
(
	'███████╗███╗   ██╗ █████╗ ██╗  ██╗███████╗██╗    ██████╗  ██████╗ ██████╗ ██╗  ██╗\n' +
	'██╔════╝████╗  ██║██╔══██╗██║ ██╔╝██╔════╝██║    ╚════██╗██╔═████╗╚════██╗██║  ██║\n' +
	'███████╗██╔██╗ ██║███████║█████╔╝ █████╗  ██║     █████╔╝██║██╔██║ █████╔╝███████║\n' +
	'╚════██║██║╚██╗██║██╔══██║██╔═██╗ ██╔══╝  ╚═╝    ██╔═══╝ ████╔╝██║██╔═══╝ ╚════██║\n' +
	'███████║██║ ╚████║██║  ██║██║  ██╗███████╗██╗    ███████╗╚██████╔╝███████╗     ██║\n' +
	'╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝    ╚══════╝ ╚═════╝ ╚══════╝     ╚═╝\n' +
	"	press 'p' to start, press 'q' to quit!"
);


var started = false;
var pressed = false;

function timed()
{
	process.stdout.write('\x1Bc');
	countdown(gameArea);
	dropFruit(gameArea);
	checkCollision(snake, gameArea);
	updateSnakePosition(snake, gameArea);
	printScore(score);
	print(gameArea);
	pressed = false;
}


