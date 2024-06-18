const readline = require('readline');
const process = require('process');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) =>
{
	if (key.name === 'q')
	{
		process.exit();
	}
	if (key.name === 'x')
	{
		rotateAnticlockwise();
	}
	if (key.name === 'c')
	{
		rotateClockwise();
	}
	if (key.name === 's')
	{
		start();
	}
	if (key.name === 'p')
	{
		end(timer);
	}
	else
	{
		switch (key.name)
		{
			case 'up':
			hardDrop();
			break;

			case 'down':
			softDrop();
			break;

			case 'left':
			left();
			break;

			case 'right':
			right();
			break;
		}
	}
});


var array = [];

const height = 20;
const width = 10;

const totalHeight = height + 6;
const totalWidth = width + 2;

for (let indexHeight = 0; indexHeight < totalHeight; indexHeight++)
{
	array.push([]);

	for (let indexWidth = 0; indexWidth < totalWidth; indexWidth++)
	{
		if (indexWidth === 0 && indexHeight === totalHeight - 1 ||
			indexWidth === totalWidth - 1 && indexHeight === totalHeight - 1)
		{
			array[indexHeight].push(6);
		}
		else if (indexWidth === 0)
		{
			array[indexHeight].push(2);
		}
		else if (indexWidth === totalWidth - 1)
		{
			array[indexHeight].push(3);
		}
		else if (indexHeight === totalHeight - 2)
		{
			array[indexHeight].push(4);
		}
		else if (indexHeight === totalHeight - 1)
		{
			array[indexHeight].push(5);
		}
		else
		{
			array[indexHeight].push(0);
		}
	}
}


const ascii = [" .", "[]", "<!", "!>", "==", "\\/", "  "];

function print(array)
{
	let arrayDisplay = '\x1Bc';

	for (let indexHeight = 4; indexHeight < array.length; indexHeight++)
	{
		arrayDisplay += '\n\t\t\t';

		for (let indexWidth = 0; indexWidth < array[indexHeight].length; indexWidth++)
		{
			arrayDisplay += ascii[array[indexHeight][indexWidth]];
		}

		if (indexHeight === 5)
		{
			arrayDisplay += '\tTOP:';
		}
		if (indexHeight === 6)
		{
			let linesString = '0'.repeat(6 - lines.toString().length);
			linesString += lines.toString();
			arrayDisplay += '\t' + linesString;
		}
		if (indexHeight === 8)
		{
			arrayDisplay += '\tSCORE:';
		}
		if (indexHeight === 9)
		{
			let scoreString = '0'.repeat(6 - score.toString().length);
			scoreString += score.toString();
			arrayDisplay += '\t' + scoreString;
		}
		if (indexHeight === 13)
		{
			arrayDisplay += '\tLINES:';
		}
		if (indexHeight === 14)
		{
			let linesString = '0'.repeat(3 - lines.toString().length);
			linesString += lines.toString();
			arrayDisplay += '\t' + linesString;
		}
		if (indexHeight === 16)
		{
			arrayDisplay += '\tLEVEL:';
		}
		if (indexHeight === 17)
		{
			let levelString = '0'.repeat(2 - level.toString().length);
			levelString += level.toString();
			arrayDisplay += '\t' + levelString;
		}
		if (indexHeight === 19)
		{
			arrayDisplay += '\tNEXT:';
		}
		if (indexHeight === 20)
		{
			arrayDisplay += '\t' + blockTypeList[next].toString();
		}
	}

	arrayDisplay += '\n';
	process.stdout.write(arrayDisplay);
}


const blockTypeList = ['T', 'I', 'O', 'J', 'L', 'S', 'Z'];
let blockType = randomBlockType();

function randomBlockType()
{
	return Math.floor(Math.random() * blockTypeList.length);
}

let y_pos = 2;
let x_pos = 6;
let rotation = 0;


function block(type, height, width, rotation, write)
{
	if (type === 'T')
	{
		if (rotation === 0)
		{
			array[height][width] = write;
			array[height][width - 1] = write;
			array[height][width + 1] = write;
			array[height + 1][width] = write;
		}
		if (rotation === 1)
		{
			array[height][width] = write;
			array[height][width - 1] = write;
			array[height - 1][width] = write;
			array[height + 1][width] = write;
		}
		if (rotation === 2)
		{
			array[height][width] = write;
			array[height][width - 1] = write;
			array[height][width + 1] = write;
			array[height - 1][width] = write;
		}
		if (rotation === 3)
		{
			array[height][width] = write;
			array[height - 1][width] = write;
			array[height][width + 1] = write;
			array[height + 1][width] = write;
		}
	}
	if (type === 'I')
	{
		if (rotation === 0 || rotation === 2)
		{
			array[height][width] = write;
			array[height][width + 1] = write;
			array[height][width - 1] = write;
			array[height][width - 2] = write;
		}
		if (rotation === 1 || rotation === 3)
		{
			array[height][width] = write;
			array[height + 1][width] = write;
			array[height - 1][width] = write;
			array[height - 2][width] = write;
		}
	}
	if (type === 'O')
	{
		array[height][width] = write;
		array[height][width - 1] = write;
		array[height - 1][width] = write;
		array[height - 1][width - 1] = write;
	}
	if (type === 'J')
	{
		if (rotation === 0)
		{
			array[height][width] = write;
			array[height][width - 1] = write;
			array[height][width + 1] = write;
			array[height + 1][width + 1] = write;
		}
		if (rotation === 1)
		{
			array[height][width] = write;
			array[height - 1][width] = write;
			array[height + 1][width] = write;
			array[height + 1][width - 1] = write;
		}
		if (rotation === 2)
		{
			array[height][width] = write;
			array[height][width + 1] = write;
			array[height][width - 1] = write;
			array[height - 1][width - 1] = write;
		}
		if (rotation === 3)
		{
			array[height][width] = write;
			array[height + 1][width] = write;
			array[height - 1][width] = write;
			array[height - 1][width + 1] = write;
		}
	}
	if (type === 'L')
	{
		if (rotation === 0)
		{
			array[height][width] = write;
			array[height][width + 1] = write;
			array[height][width - 1] = write;
			array[height + 1][width - 1] = write;
		}
		if (rotation === 1)
		{
			array[height][width] = write;
			array[height + 1][width] = write;
			array[height - 1][width] = write;
			array[height - 1][width - 1] = write;
		}
		if (rotation === 2)
		{
			array[height][width] = write;
			array[height][width - 1] = write;
			array[height][width + 1] = write;
			array[height - 1][width + 1] = write;
		}
		if (rotation === 3)
		{
			array[height][width] = write;
			array[height - 1][width] = write;
			array[height + 1][width] = write;
			array[height + 1][width + 1] = write;
		}
	}
	if (type === 'S')
	{
		if (rotation === 0 || rotation === 2)
		{
			array[height][width] = write;
			array[height][width + 1] = write;
			array[height + 1][width] = write;
			array[height + 1][width - 1] = write;
		}
		if (rotation === 1 || rotation === 3)
		{
			array[height][width] = write;
			array[height - 1][width] = write;
			array[height][width + 1] = write;
			array[height + 1][width + 1] = write;
		}
	}
	if (type === 'Z')
	{
		if (rotation === 0 || rotation === 2)
		{
			array[height][width] = write;
			array[height][width - 1] = write;
			array[height + 1][width] = write;
			array[height + 1][width + 1] = write;
		}
		if (rotation === 1 || rotation === 3)
		{
			array[height][width] = write;
			array[height + 1][width] = write;
			array[height][width + 1] = write;
			array[height - 1][width + 1] = write;
		}
	}
}

function blockCollision(type, height, width, rotation)
{
	let collision = 0;

	if (type === 'T')
	{
		if (rotation === 0)
		{
			collision += array[height][width];
			collision += array[height][width - 1];
			collision += array[height][width + 1];
			collision += array[height + 1][width];
		}
		if (rotation === 1)
		{
			collision += array[height][width];
			collision += array[height][width - 1];
			collision += array[height - 1][width];
			collision += array[height + 1][width];
		}
		if (rotation === 2)
		{
			collision += array[height][width];
			collision += array[height][width - 1];
			collision += array[height][width + 1];
			collision += array[height - 1][width];
		}
		if (rotation === 3)
		{
			collision += array[height][width];
			collision += array[height - 1][width];
			collision += array[height][width + 1];
			collision += array[height + 1][width];
		}
	}
	if (type === 'I')
	{
		if (rotation === 0 || rotation === 2)
		{
			collision += array[height][width];
			collision += array[height][width + 1];
			collision += array[height][width - 1];
			collision += array[height][width - 2];
		}
		if (rotation === 1 || rotation === 3)
		{
			collision += array[height][width];
			collision += array[height + 1][width];
			collision += array[height - 1][width];
			collision += array[height - 2][width];
		}
	}
	if (type === 'O')
	{
		collision += array[height][width];
		collision += array[height][width - 1];
		collision += array[height - 1][width];
		collision += array[height - 1][width - 1];
	}
	if (type === 'J')
	{
		if (rotation === 0)
		{
			collision += array[height][width];
			collision += array[height][width - 1];
			collision += array[height][width + 1];
			collision += array[height + 1][width + 1];
		}
		if (rotation === 1)
		{
			collision += array[height][width];
			collision += array[height - 1][width];
			collision += array[height + 1][width];
			collision += array[height + 1][width - 1];
		}
		if (rotation === 2)
		{
			collision += array[height][width];
			collision += array[height][width + 1];
			collision += array[height][width - 1];
			collision += array[height - 1][width - 1];
		}
		if (rotation === 3)
		{
			collision += array[height][width];
			collision += array[height + 1][width];
			collision += array[height - 1][width];
			collision += array[height - 1][width + 1];
		}
	}
	if (type === 'L')
	{
		if (rotation === 0)
		{
			collision += array[height][width];
			collision += array[height][width + 1];
			collision += array[height][width - 1];
			collision += array[height + 1][width - 1];
		}
		if (rotation === 1)
		{
			collision += array[height][width];
			collision += array[height + 1][width];
			collision += array[height - 1][width];
			collision += array[height - 1][width - 1];
		}
		if (rotation === 2)
		{
			collision += array[height][width];
			collision += array[height][width - 1];
			collision += array[height][width + 1];
			collision += array[height - 1][width + 1];
		}
		if (rotation === 3)
		{
			collision += array[height][width];
			collision += array[height - 1][width];
			collision += array[height + 1][width];
			collision += array[height + 1][width + 1];
		}
	}
	if (type === 'S')
	{
		if (rotation === 0 || rotation === 2)
		{
			collision += array[height][width];
			collision += array[height][width + 1];
			collision += array[height + 1][width];
			collision += array[height + 1][width - 1];
		}
		if (rotation === 1 || rotation === 3)
		{
			collision += array[height][width];
			collision += array[height - 1][width];
			collision += array[height][width + 1];
			collision += array[height + 1][width + 1];
		}
	}
	if (type === 'Z')
	{
		if (rotation === 0 || rotation === 2)
		{
			collision += array[height][width];
			collision += array[height][width - 1];
			collision += array[height + 1][width];
			collision += array[height + 1][width + 1];
		}
		if (rotation === 1 || rotation === 3)
		{
			collision += array[height][width];
			collision += array[height + 1][width];
			collision += array[height][width + 1];
			collision += array[height - 1][width + 1];
		}
	}

	return collision
}


function left()
{
	if (blockCollision(blockTypeList[blockType], y_pos, x_pos - 1, rotation) === 0)
	{
		x_pos--;
	}
}

function right()
{
	if (blockCollision(blockTypeList[blockType], y_pos, x_pos + 1, rotation) === 0)
	{
		x_pos++;
	}
}

function softDrop()
{
	if (blockCollision(blockTypeList[blockType], y_pos + 1, x_pos, rotation) === 0)
	{
		y_pos++;
	}
	else if (blockCollision(blockTypeList[blockType], y_pos + 1, x_pos, rotation) !== 0)
	{
		block(blockTypeList[blockType], y_pos, x_pos, rotation, 1);

		y_pos = 2;
		x_pos = 6;
		blockType = next;
		next = randomBlockType();

		score += 1;
	}
}

function hardDrop()
{
	while (blockCollision(blockTypeList[blockType], y_pos + 1, x_pos, rotation) === 0)
	{
		y_pos++;
	}
	if (blockCollision(blockTypeList[blockType], y_pos + 1, x_pos, rotation) !== 0)
	{
		block(blockTypeList[blockType], y_pos, x_pos, rotation, 1);

		y_pos = 2;
		x_pos = 6;
		blockType = next;
		next = randomBlockType();

		score += 1;
	}
}

function rotateClockwise()
{
	if (rotation === 3 && blockCollision(blockTypeList[blockType], y_pos, x_pos, 0) === 0)
	{
		rotation = 0;
	}
	else if (rotation !== 3 && blockCollision(blockTypeList[blockType], y_pos, x_pos, rotation + 1) === 0)
	{
		rotation++;
	}
}

function rotateAnticlockwise()
{
	if (rotation === 0 && blockCollision(blockTypeList[blockType], y_pos, x_pos, 3) === 0)
	{
		rotation = 3;
	}
	else if (rotation !== 0 && blockCollision(blockTypeList[blockType], y_pos, x_pos, rotation - 1) === 0)
	{
		rotation--;
	}
}


function clearLine(atHeight)
{
	for (let indexHeight = atHeight - 1; indexHeight > 3; indexHeight--)
	{
		for (let indexWidth = 1; indexWidth < totalWidth - 1; indexWidth++)
		{
			array[indexHeight + 1][indexWidth] = array[indexHeight][indexWidth];
		}
	}
}

let score = 0;
let scoreCount = 0;
let lines = 0;
let level = 1;
let levelCount = 0;
let next = randomBlockType();

function clearLineCheck()
{
	for (let indexHeight = height + 3; indexHeight > 3; indexHeight--)
	{
		let count = 0;

		for (let indexWidth = 1; indexWidth < totalWidth - 1; indexWidth++)
		{
			if (array[indexHeight][indexWidth] > 0)
			{
				count++;
			}

		}

		if (count === width)
		{
			clearLine(indexHeight);
			scoreCount++;
			lines++;
			levelCount++;

			if (Math.random() > 0.5 && levelCount >= 10)
			{
				level++;
				levelCount = 0;

				if (stepRate > 1)
				{
					stepCount = 0;
					stepRate -= 1;
				}
			}

			return;
		}
	}

	score += scoreCount * scoreCount * 100;
	scoreCount = 0;
}


var timer = setInterval(tick, 50);

function start()
{
	timer = setInterval(tick, 50);
}

function end(timer)
{
	clearInterval(timer);
}


let stepCount = 0;
let stepRate = 10;

function step()
{
	stepCount++;

	if (stepCount === stepRate)
	{
		stepCount = 0;

		softDrop();
	}
}

function tick()
{
	step();
	clearLineCheck();

	block(blockTypeList[blockType], y_pos, x_pos, rotation, 1);
	print(array);
	block(blockTypeList[blockType], y_pos, x_pos, rotation, 0);
}
