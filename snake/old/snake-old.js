process.stdout.write('\x1Bc');

const readline = require('readline');
const rl = readline.createInterface ({
	input: process.stdin,
	output: process.stdout
});

process.stdin.on('keypress', (str, key) => {
	if (str === 'r')
	{
	}

	if (str === 's')
	{
	} 
});

const height = 10;
const width = 10;
const ascii = [". ", "# "];

var gameGrid = generateGrid(height, width); 
var snakePosition = [1, 2];

function generateGrid(height, width)
{
	let array = [];

	for (let indexHeight = 0; indexHeight < height; indexHeight++)
	{
		array.push([]);

		for (let indexWidth = 0; indexWidth < width; indexWidth++)
		{
			array[indexHeight].push(0);
		}
	}

	return array;
}

function printGrid(array)
{
	for (let indexHeight = 0; indexHeight < height; indexHeight++)
	{
		for (let indexWidth = 0; indexWidth < width; indexWidth++)
		{
			process.stdout.write(convertToAscii(array[indexHeight][indexWidth]));
		}

		process.stdout.write('\n');
	}
}

function convertToAscii(index)
{
	if (index == 0)
	{
		return ascii[0];
	}

	if (index == 1)
	{
		return ascii[1];
	}
}

function updateSnakePosition(position, array)
{
	array[position[0]][position[1]] = 1;
}

function snakeMoveUp(position)
{
	if (position[0] = 0)
	{
		return [array.length - 1, position[1]];
	}

	return [position[0] - 1, position[1]];
}

console.log(snakePosition);
snakePosition = snakeMoveUp(snakePosition);
console.log(snakePosition);

/*
updateSnakePosition(snakePosition, gameGrid);
printGrid(gameGrid);
process.stdout.write('\n');

snakeMoveUp(snakePosition);
console.log(snakePosition);
updateSnakePosition(snakePosition, gameGrid);
printGrid(gameGrid);
process.stdout.write('\n');
*/
