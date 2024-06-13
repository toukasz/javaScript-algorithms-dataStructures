const readline = require('readline');
const rl = readline.createInterface
({
	input: process.stdin,
	output: process.stdout
});

process.stdin.on('keypress', (str, key) =>
{
	if (str === 'd')
	{
		rule = generateRule(ruleType);
	}

	if (str === '0')
	{
		rule = generateRule(0);
	}

	if (str === '1')
	{
		rule = generateRule(1);
	}

	if (str === '2')
	{
		rule = generateRule(2);
	}

	if (str === '3')
	{
		rule = generateRule(3);
	}

	if (str === 'b')
	{
		array = generateBlankArray(height, width, emptyArray(height, width));
	}

	if (str === 'n')
	{
		array = generateNoisyArray(height, width, emptyArray(height, width));
	}

	if (str === 'p')
	{
		startGeneration();
	}

	if (str === 'q')

	{
		process.exit();
	}
});


process.stdout.write
(
	'\x1Bc' +
	"press 'p' to start\n" +
	"press 'q' to quit\n" +
	"press 'd' to refresh default ruleset\n" +
	"press '0' to '3' to access other rulesets\n" +
	"0 = game of life\n" +
	"1 = randomly generated ruleset without consideration for central cell\n" +
	"2 = randomly generated ruleset with consideration for central cell\n" +
	"press 'b' to generate a blank array\n" +
	"press 'n' to generate a noisy array\n"
);

const height = 39;
const width = 79;
const ascii = ["  ", "██"];
const ruleType = 2;

const gameOfLifeRule = [[0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0]];
const desiredRule = [[0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 0, 1]];

var array = generateNoisyArray(height, width, emptyArray(height, width));
var rule = generateRule(ruleType);


function arrayIteratePrint()
{
	process.stdout.write('\x1Bc');
	process.stdout.write('Rule: ' + '\n' + rule[0].toString() + '\n' + rule[1].toString() + '\n');
	printArray(array, ascii);
	array = arrayIterate(array);
}

function startGeneration()
{
	var generate = setInterval(arrayIteratePrint, 100);
}

//

function arrayRow(width)
{
	let array = [];

	for (let i = 0; i < width; i++)
	{
		array.push([]);
	}

	return array;
}

function emptyArray(height, width)
{
	let array = [];

	for (let i = 0; i < height; i++)
	{
		array.push(arrayRow(width));
	}

	return array;
}

function randomInteger()
{
	if (Math.random() >= 0.5)
	{
		return 1;
	}

	return 0;
}

function generateNoisyArray(height, width, array)
{
	for (let indexHeight = 0; indexHeight < height; indexHeight++)
	{
		for (let indexWidth = 0; indexWidth < width; indexWidth++)
		{
			array[indexHeight][indexWidth] = randomInteger();
		}
	}

	return array;
}

function generateBlankArray(height, width, array)
{
	for (let indexHeight = 0; indexHeight < height; indexHeight++)
	{
		for (let indexWidth = 0; indexWidth < width; indexWidth++)
		{
			if (indexWidth == parseInt(width / 2) || indexHeight == parseInt(height / 2))
			{
				array[indexHeight][indexWidth] = 1;
			}

			else
			{
			array[indexHeight][indexWidth] = 0;
			}
		}
	}

	return array;
}

function printAscii(value, ascii)
{
	if (value == 0)
	{
		return ascii[0];
	}

	if (value == 1)
	{
		return ascii[1];
	}

	return "? ";
}

function printArray(array, ascii)
{
	for (let indexHeight = 0; indexHeight < height; indexHeight++)
	{
		for (let indexWidth = 0; indexWidth < width; indexWidth++)
		{
			process.stdout.write(printAscii(array[indexHeight][indexWidth], ascii));
		}
		
		process.stdout.write("\n");
	}
}

function indexTopLeft(nth_height, nth_width, array)
{
	let height = array.length;
	let width = array[0].length;

	if (nth_height == 0 && nth_width == 0)
	{
		return array[height - 1][width - 1];
	}

	if (nth_height == 0)
	{
		return array[height - 1][nth_width - 1];
	}

	if (nth_width == 0)
	{
		return array[nth_height - 1][width - 1];
	}

	return array[nth_height - 1][nth_width - 1];
}

function indexTopRight(nth_height, nth_width, array)
{
	let height = array.length;
	let width = array[0].length;

	if (nth_height == 0 && nth_width == width - 1)
	{
		return array[height - 1][0];
	}

	if (nth_height == 0)
	{
		return array[height - 1][nth_width + 1];
	}

	if (nth_width == width - 1)
	{
		return array[height - 1][0];
	}

	return array[nth_height - 1][nth_width + 1];
}

function indexBottomLeft(nth_height, nth_width, array)
{
	let height = array.length;
	let width = array[0].length;

	if (nth_height == height - 1 && nth_width == 0)
	{
		return array[0][width - 1];
	}

	if (nth_height == height - 1)
	{
		return array[0][nth_width - 1];
	}

	if (nth_width == 0)
	{
		return array[nth_height + 1][width - 1];
	}

	return array[nth_height + 1][nth_width - 1];
}

function indexBottomRight(nth_height, nth_width, array)
{
	let height = array.length;
	let width = array[0].length;

	if (nth_height == height - 1 && nth_width == width - 1)
	{
		return array[0][0];
	}

	if (nth_height == height - 1)
	{
		return array[0][nth_width + 1];
	}

	if (nth_width == width - 1)
	{
		return array[nth_height + 1][0];
	}

	return array[nth_height + 1][nth_width + 1];
}

function indexTop(nth_height, nth_width, array)
{
	let height = array.length;
	let width = array[0].length;

	if (nth_height == 0)
	{
		return array[height - 1][nth_width];
	}

	return array[nth_height - 1][nth_width];
}

function indexBottom(nth_height, nth_width, array)
{
	let height = array.length;
	let width = array[0].length;

	if (nth_height == height - 1)
	{
		return array[0][nth_width];
	}

	return array[nth_height + 1][nth_width];
}

function indexLeft(nth_height, nth_width, array)
{
	let height = array.length;
	let width = array[0].length;

	if (nth_width == 0)
	{
		return array[nth_height][width - 1];
	}

	return array[nth_height][nth_width - 1];
}

function indexRight(nth_height, nth_width, array)
{
	let height = array.length;
	let width = array[0].length;

	if (nth_width == width - 1)
	{
		return array[nth_height][0];
	}

	return array[nth_height][nth_width + 1];
}

function indexCenter(nth_height, nth_width, array)
{
	return array[nth_height][nth_width];
}

function indexSumNeighbourhood (nth_height, nth_width, array)
{
	return indexTopLeft(nth_height, nth_width, array)
		+ indexTopRight(nth_height, nth_width, array)
		+ indexBottomLeft(nth_height, nth_width, array)
		+ indexBottomRight(nth_height, nth_width, array)
		+ indexTop(nth_height, nth_width, array)
		+ indexBottom(nth_height, nth_width, array)
		+ indexLeft(nth_height, nth_width, array)
		+ indexRight(nth_height, nth_width, array)
}

function indexIterate(nth_height, nth_width, array) {
	return rule[indexCenter(nth_height, nth_width, array)][indexSumNeighbourhood(nth_height, nth_width, array)];
}

function arrayIterate(array)
{
	let arrayNew = emptyArray(array.length, array[0].length);

	for (let nth_height = 0; nth_height < array.length; nth_height++)
	{
		for (let nth_width = 0; nth_width < array[0].length; nth_width++)
		{
			arrayNew[nth_height][nth_width] = indexIterate(nth_height, nth_width, array);
		}
	}
	return arrayNew;
}

function generateRule(number)
{
	if (number == 1)
	{
		return generateRandomRuleType1();
	}

	if (number == 2)
	{
		return generateRandomRuleType2();
	}

	if (number == 3)
	{
		return desiredRule;
	}

	return gameOfLifeRule;
}

function generateRandomRuleType1()
{
	let array = [[0, 1, 2, 3, 4, 5, 6, 7, 8],[0, 1, 2, 3, 4, 5, 6, 7, 8]];

	for (let i = 0; i < 9; i++)
	{
		array[0][i] = randomInteger();
	}

	for (let i = 0; i < 9; i++)
	{
		array[1][i] = array[0][i];
	}

	return array;
}

function generateRandomRuleType2()
{
	let array = [[0, 1, 2, 3, 4, 5, 6, 7, 8],[0, 1, 2, 3, 4, 5, 6, 7, 8]];

	for (let i = 0; i < 9; i++)
	{
		array[0][i] = randomInteger();
	}

	for (let i = 0; i < 9; i++)
	{
		array[1][i] = randomInteger();
	}

	return array;
}
