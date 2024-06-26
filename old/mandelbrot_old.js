const math = require('mathjs');


const y_depth = 40;
const x_depth = 80;

const array = generateArray(y_depth, x_depth);
const arrayRadius = generateArray(y_depth, x_depth);

function generateArray(y_depth, x_depth)
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

const y_min = -1.5;
const y_max = 1.5;
const x_min = -3;
const x_max = 3;

for (let y_index = 0; y_index < y_depth; y_index++)
{
	for (let x_index = 0; x_index < x_depth; x_index++)
	{
		array[y_depth - y_index - 1][x_index] = math.complex
		(generateIndexValue(x_index, x_depth, x_min, x_max),
		generateIndexValue(y_index, y_depth, y_min, y_max));
	}
}

function generateIndexValue(index, depth, min, max)
{
	const step = (max - min) / depth;
	return min + index * step;
}

const arrayOld = array;

const iterationCount = 50;

for (let index = 0; index < iterationCount; index++)
{
	iterateMandelbrot();
}

function iterateMandelbrot()
{
	for (let y_index = 0; y_index < y_depth; y_index++)
	{
		for (let x_index = 0; x_index < x_depth; x_index++)
		{
			array[y_index][x_index] = mandelbrot(array[y_index][x_index], y_index, x_index);
		}
	}
}

function mandelbrot(c_index, y_index, x_index)
{
	return math.add(math.square(c_index), arrayOld[y_index][x_index]);
}

for (let y_index = 0; y_index < y_depth; y_index++)
{
	for (let x_index = 0; x_index < x_depth; x_index++)
	{
		arrayRadius[y_index][x_index] = math.abs(array[y_index][x_index]);
	}
}

print();

function print()
{
	for (let y_index = 0; y_index < y_depth; y_index++)
	{
		for (let x_index = 0; x_index < x_depth; x_index++)
		{
			process.stdout.write(toAscii(arrayRadius[y_index][x_index]));
		}

		process.stdout.write('\n');
	}
}

function toAscii(c_index)
{
	if (c_index <= 0.5)
	{
		return '* ';
	}
	else
	{
		return '  ';
	}
}
