const readline = require('readline');
const process = require('process');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) =>
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

		case 'x':
		hold();
		break;

		case 'v':
		rotateClockwise();
		break;

		case 'd':
		rotateAnticlockwise();
		break;

		case 'p':
		pause();
		break;

		case 'r':
		reset();
		break;

		case 'r':
		reset();
		break;

		case 'q':
		process.exit();
		break;
	}
});


var array = [];

const height = 20;
const width = 10;

const totalHeight = height + 6;
const totalWidth = width + 2;

generateArray();

function generateArray()
{
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
}


const ascii = [" .", "[]", "<!", "!>", "==", "\\/", "  "];

function print()
{
	let arrayDisplay = '\x1Bc';

	for (let indexHeight = 4; indexHeight < array.length; indexHeight++)
	{
		switch (indexHeight)
		{
			case 5:
			arrayDisplay += '\n\tHOLD:\t\t';
			break;

			case 6:
			arrayDisplay += '\n\t' + printPreview(0, blockHold) + '\t';
			break;

			case 7:
			arrayDisplay += '\n\t' + printPreview(1, blockHold) + '\t';
			break;

			case 8:
			arrayDisplay += '\n\t' + printPreview(2, blockHold) + '\t';
			break;

			case 9:
			arrayDisplay += '\n\t' + printPreview(3, blockHold) + '\t';
			break;

			default:
			arrayDisplay += '\n\t\t\t';
			break;
		}

		for (let indexWidth = 0; indexWidth < array[indexHeight].length; indexWidth++)
		{
			arrayDisplay += ascii[array[indexHeight][indexWidth]];
		}

		if (indexHeight === 5)
		{
			arrayDisplay += '\tNEXT:\t\t';
		}
		if (indexHeight === 6)
		{
			arrayDisplay += '\t' + printPreview(0, next) + '\t';
		}
		if (indexHeight === 7)
		{
			arrayDisplay += '\t' + printPreview(1, next) + '\t';
		}
		if (indexHeight === 8)
		{
			arrayDisplay += '\t' + printPreview(2, next) + '\t';
		}
		if (indexHeight === 9)
		{
			arrayDisplay += '\t' + printPreview(3, next) + '\t';
		}
		if (indexHeight === 12)
		{
			arrayDisplay += '\tSCORE:';
		}
		if (indexHeight === 13)
		{
			let scoreString = '0'.repeat(6 - score.toString().length);
			scoreString += score.toString();
			arrayDisplay += '\t' + scoreString;
		}
		if (indexHeight === 15)
		{
			arrayDisplay += '\tLINES:';
		}
		if (indexHeight === 16)
		{
			let linesString = '0'.repeat(3 - lines.toString().length);
			linesString += lines.toString();
			arrayDisplay += '\t' + linesString;
		}
		if (indexHeight === 18)
		{
			arrayDisplay += '\tLEVEL:';
		}
		if (indexHeight === 19)
		{
			let levelString = '0'.repeat(2 - level.toString().length);
			levelString += level.toString();
			arrayDisplay += '\t' + levelString;
		}
	}

	arrayDisplay += '\n';
	process.stdout.write(arrayDisplay);
}

function printPreview(indexHeight, blockType)
{
	if (indexHeight === 0)
	{
		switch (blockType)
		{
			case 0:	// T
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 1:	// I
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 2:	// O
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 3:	// J
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 4:	// L
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 5:	// S
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 6:	// Z
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			default:
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
		}
	}
	if (indexHeight === 1)
	{
		switch (blockType)
		{
			case 0:	// T
			return ascii[0] + ascii[1] + ascii[1] + ascii[1];
			break;
			case 1:	// I
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 2:	// O
			return ascii[0] + ascii[1] + ascii[1] + ascii[0];
			break;
			case 3:	// J
			return ascii[1] + ascii[1] + ascii[1] + ascii[0];
			break;
			case 4:	// L
			return ascii[0] + ascii[1] + ascii[1] + ascii[1];
			break;
			case 5:	// S
			return ascii[0] + ascii[0] + ascii[1] + ascii[1];
			break;
			case 6:	// Z
			return ascii[1] + ascii[1] + ascii[0] + ascii[0];
			break;
			default:
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
		}
	}
	if (indexHeight === 2)
	{
		switch (blockType)
		{
			case 0:	// T
			return ascii[0] + ascii[0] + ascii[1] + ascii[0];
			break;
			case 1:	// I
			return ascii[1] + ascii[1] + ascii[1] + ascii[1];
			break;
			case 2:	// O
			return ascii[0] + ascii[1] + ascii[1] + ascii[0];
			break;
			case 3:	// J
			return ascii[0] + ascii[0] + ascii[1] + ascii[0];
			break;
			case 4:	// L
			return ascii[0] + ascii[1] + ascii[0] + ascii[0];
			break;
			case 5:	// S
			return ascii[0] + ascii[1] + ascii[1] + ascii[0];
			break;
			case 6:	// Z
			return ascii[0] + ascii[1] + ascii[1] + ascii[0];
			break;
			default:
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
		}
	}
	if (indexHeight === 3)
	{
		switch (blockType)
		{
			case 0:	// T
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 1:	// I
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 2:	// O
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 3:	// J
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 4:	// L
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 5:	// S
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			case 6:	// Z
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
			default:
			return ascii[0] + ascii[0] + ascii[0] + ascii[0];
			break;
		}
	}
}


const blockTypeList = ['T', 'I', 'O', 'J', 'L', 'S', 'Z', ' '];
let blockType = randomBlockType();

function randomBlockType()
{
	return Math.floor(Math.random() * 7);
}

const y_pos_start = 2;
const x_pos_start = 6;
const rotation_start = 0;

let y_pos = y_pos_start;
let x_pos = x_pos_start;
let rotation = rotation_start;


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
	if (blockCollision(blockTypeList[blockType], y_pos + 1, x_pos, rotation) !== 0 &&
		y_pos === 2)
	{
		end();
	}
	else if (blockCollision(blockTypeList[blockType], y_pos + 1, x_pos, rotation) === 0)
	{
		y_pos++;
	}
	else if (blockCollision(blockTypeList[blockType], y_pos + 1, x_pos, rotation) !== 0)
	{
		block(blockTypeList[blockType], y_pos, x_pos, rotation, 1);

		y_pos = y_pos_start;
		x_pos = x_pos_start;
		rotation = rotation_start;
		blockType = next;
		next = randomBlockType();
		blockHoldCount = 0;

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

		y_pos = y_pos_start;
		x_pos = x_pos_start;
		rotation = rotation_start;
		blockType = next;
		next = randomBlockType();
		blockHoldCount = 0;

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

let blockHold = 7;
let blockHoldCount = 0;

function hold()
{
	if (blockHold === 7)
	{
		blockHold = blockType;

		y_pos = 2;
		x_pos = 6;
		rotation = 0;
		blockType = next;
		next = randomBlockType();
	}
	else if (blockHoldCount < 2)
	{
		[blockHold, blockType] = [blockType, blockHold];

		y_pos = 2;
		x_pos = 6;
		rotation = 0;

		blockHoldCount++;
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

			if (Math.random() > 0.5 && levelCount >= 8 && level <= 20)
			{
				stepRate = stepRates[level];
				stepCount = 0;
				level++;
				levelCount = 0;
			}

			return;
		}
	}

	score += scoreCount * scoreCount * 100;
	scoreCount = 0;
}


const intervalPeriod = 20;
var timer = setInterval(tick, intervalPeriod);

let pauseState = false;

function pause()
{
	if (pauseState === false)
	{
		pauseState = true;
		clearInterval(timer);
		return;
	}
	if (pauseState === true)
	{
		pauseState = false;
		timer = setInterval(tick, intervalPeriod);
		return;
	}
}

function reset()
{
	clearInterval(timer);
	timer = setInterval(tick, intervalPeriod);
	pauseState = false;

	array = [];
	generateArray();

	y_pos = y_pos_start;
	x_pos = x_pos_start;
	rotation = rotation_start;

	blockHold = 7;
	blockHoldCount = 0;

	score = 0;
	scoreCount = 0;
	lines = 0;
	level = 1;
	levelCount = 0;
	next = randomBlockType();

	stepCount = 0;
	stepRate = stepRates[0];
}

function end()
{
	clearInterval(timer);
}


let stepCount = 0;

const stepRates = [100, 80, 60, 50, 40, 30, 20, 15, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let stepRate = stepRates[0];

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
	print();
	block(blockTypeList[blockType], y_pos, x_pos, rotation, 0);
}
