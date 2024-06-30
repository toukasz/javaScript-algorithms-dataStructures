const math = require('mathjs');
const readline = require('readline');
const process = require('process');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) =>
{
	switch (key.name)
	{
		case 'q':
		process.exit();
		break;
	}
});

const x_depth = 1200;
const y_depth = 180;

const x_min = -0.75;
const x_max = 0.5;
const y_min = 0.4;
const y_max = 1.2;

const array = generateArray();
const initialArray = generateArray();

function generateArray()
{
	let array = [];

	for (let y_index = 0; y_index < y_depth; y_index++)
	{
		array.push([]);

		for (let x_index = 0; x_index < x_depth; x_index++)
		{
			array[y_index].push([]);
		}
	}

	return array;
}

generateArrayValues(array);
generateArrayValues(initialArray);

function generateArrayValues(array)
{
	for (let y_index = 0; y_index < y_depth; y_index++)
	{
		for (let x_index = 0; x_index < x_depth; x_index++)
		{
			array[y_depth - y_index - 1][x_index] = math.complex
				(generateIndexValue(x_index, x_min, x_max, x_depth),
				generateIndexValue(y_index, y_min, y_max, y_depth));
		}
	}
}

function generateIndexValue(index, min, max, depth)
{
	return min + index * (max - min) / depth;
}

function iterate()
{
	for (let y_index = 0; y_index < y_depth; y_index++)
	{
		for (let x_index = 0; x_index < x_depth; x_index++)
		{
			array[y_index][x_index] = mandelbrot(array[y_index][x_index], y_index, x_index);
		}
	}
}

function mandelbrot(z_index, y_index, x_index)
{
	const z_squared = math.square(z_index);
	const c_value = initialArray[y_index][x_index];
	return math.add(z_squared, c_value);
}

function print()
{
	let string = '\x1Bc';

	for (let y_index = 0; y_index < y_depth; y_index++)
	{
		for (let x_index = 0; x_index < x_depth; x_index++)
		{
			string = string.concat(toAscii(array[y_index][x_index]));
		}

		string = string.concat('\n');
	}

	process.stdout.write(string);
}

function toAscii(c_index)
{
	let radius = math.abs(c_index);

	if (radius <= 0.125)
	{
		return ascii[9];
	}
	if (radius <= 0.25)
	{
		return ascii[8];
	}
	if (radius <= 0.5)
	{
		return ascii[7];
	}
	if (radius <= 1.0)
	{
		return ascii[6];
	}
	if (radius <= 2.0)
	{
		return ascii[5];
	}
	if (radius <= 4.0)
	{
		return ascii[4];
	}
	if (radius <= 8.0)
	{
		return ascii[3];
	}
	if (radius <= 16.0)
	{
		return ascii[2];
	}
	if (radius <= 32.0)
	{
		return ascii[1];
	}

	return ascii[0];
}

const ascii = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@']

print();
iterate();

let interval = setInterval(timed, 2000);
let count = 0;

function timed()
{
	print();
	iterate();

	if (count > 30)
	{
		clearInterval(interval);
	}
	count++;
}
