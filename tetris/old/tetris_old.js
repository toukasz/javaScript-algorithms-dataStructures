const readline = require('readline');
const process = require('process');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) =>
{
	if (key.ctrl && key.name === 'c')
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
	else
	{
		switch (key.name)
		{
			case 'up':
			console.log('Up arrow pressed');
			break;
			case 'down':
			console.log('Down arrow pressed');
			down();
			break;
			case 'left':
			console.log('Left arrow pressed');
			left();
			break;
			case 'right':
			console.log('Right arrow pressed');
			right();
			break;
		}
	}
});


var array = [];

const height = 20;
const width = 10;

const totalHeight = height + 5;
const totalWidth = width + 2;

for (let indexHeight = 0; indexHeight < totalHeight; indexHeight++)
{
	array.push([]);

	for (let indexWidth = 0; indexWidth < totalWidth; indexWidth++)
	{
		if (indexWidth === 0)
		{
			array[indexHeight].push(2);
		}
		else if (indexWidth === totalWidth - 1)
		{
			array[indexHeight].push(3);
		}
		else if (indexHeight === totalHeight - 1)
		{
			array[indexHeight].push(4);
		}
		else
		{
			array[indexHeight].push(0);
		}
	}
}


const ascii = [" .", "[]", "<!", "!>", "==", "\\/"];

function print(array)	// TO-DO: cut out the first 4 rows
{
	process.stdout.write('\x1Bc');

	for (let indexHeight = 0; indexHeight < array.length; indexHeight++)
	{
		for (let indexWidth = 0; indexWidth < array[indexHeight].length; indexWidth++)
		{
			process.stdout.write(ascii[array[indexHeight][indexWidth]]);
		}

		process.stdout.write('\n');
	}
}


// CURRENT POSITION
var blockHeight = 5;
var blockWidth = 5;
var blockRotation = 3;
var blockWrite = 1;

function block(type, height, width, rotation, write, check)
{
	if (type === 0)
	{
		T_block(height, width, rotation, write, check)
	}
}

function T_block(height, width, rotation, write, check)
{
	if (check === true)
	{
		let collisions = 0;

		if (rotation === 0)
		{
			collisions += array[height][width];
			collisions += array[height][width - 1];
			collisions += array[height][width + 1];
			collisions += array[height + 1][width];
		}
		if (rotation === 1)
		{
			collisions += array[height][width];
			collisions += array[height][width - 1];
			collisions += array[height - 1][width];
			collisions += array[height + 1][width];
		}
		if (rotation === 2)
		{
			collisions += array[height][width];
			collisions += array[height][width - 1];
			collisions += array[height][width + 1];
			collisions += array[height - 1][width];
		}
		if (rotation === 3)
		{
			collisions += array[height][width];
			collisions += array[height - 1][width];
			collisions += array[height][width + 1];
			collisions += array[height + 1][width];
		}

		return collisions;
	}

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

function left()
{
	if (T_block(blockHeight, blockWidth - 1, blockRotation, 0, true) === 0)
	{
		T_block(blockHeight, blockWidth, blockRotation, 0);
		blockWidth--;
		T_block(blockHeight, blockWidth, blockRotation, 1);
	}
}

function right()
{
	if (T_block(blockHeight, blockWidth + 1, blockRotation, 0, true) === 0)
	{
		T_block(blockHeight, blockWidth, blockRotation, 0);
		blockWidth++;
		T_block(blockHeight, blockWidth, blockRotation, 1);
	}
}

function down()
{
	if (T_block(blockHeight + 1, blockWidth, blockRotation, 0, true) === 0)
	{
		T_block(blockHeight, blockWidth, blockRotation, 0);
		blockHeight++;
		T_block(blockHeight, blockWidth, blockRotation, 1);
	}
}

function rotateClockwise()
{
	if (blockRotation === 3 && T_block(blockHeight, blockWidth, 0, 0, true) === 0)
	{
		T_block(blockHeight, blockWidth, blockRotation, 0);
		blockRotation = 0;
		T_block(blockHeight, blockWidth, blockRotation, 1);
		return;
	}

	if (blockRotation === 3 && T_block(blockHeight, blockWidth, 0, 0, true) !== 0)
	{
		blockRotation = 3;
		return;
	}

	if (T_block(blockHeight, blockWidth, blockRotation + 1, 0, true) === 0)
	{
		T_block(blockHeight, blockWidth, blockRotation, 0);
		blockRotation++;
		T_block(blockHeight, blockWidth, blockRotation, 1);
		return;
	}
}

function rotateAnticlockwise()
{
	if (blockRotation === 0 && T_block(blockHeight, blockWidth, 3, 0, true) === 0)
	{
		T_block(blockHeight, blockWidth, blockRotation, 0);
		blockRotation = 3;
		T_block(blockHeight, blockWidth, blockRotation, 1);
		return;
	}

	if (T_block(blockHeight, blockWidth, blockRotation - 1, 0, true) === 0)
	{
		T_block(blockHeight, blockWidth, blockRotation, 0);
		blockRotation--;
		T_block(blockHeight, blockWidth, blockRotation, 1);
		return;
	}
}

function drop()
{
	{
		blockHeight++;
		if (T_block(blockHeight, blockWidth, blockRotation, 0, true) > 0)
		{
			blockHeight--;
			T_block(blockHeight, blockWidth, blockRotation, 1);
			blockHeight = 4;
			blockWidth = 6;
		}
	}
}


let count = 0;

function timed()
{
	T_block(blockHeight, blockWidth, blockRotation, 1);
	print(array);
	T_block(blockHeight, blockWidth, blockRotation, 0);

	if (count === 0)
	{
		drop();
	}
	count++;
	if (count === 10)
	{
		count = 0;
	}	
}

setInterval(timed, 50);
