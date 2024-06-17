var array = [];
const length = 100;

for (let index = 0; index < length; index++)
{
	array.push(index + 1);
}

for (let index = length - 1; index != 0; index--)
{
	let randomIndex = Math.floor(Math.random() * index);

	[array[index], array[randomIndex]] =
	[array[randomIndex], array[index]];
}

function print(array)
{
	process.stdout.write('\x1Bc');

	for (let index = 0; index < array.length; index++)
	{
		process.stdout.write('[]'.repeat(array[index]) + '\n');	
	}
}

/*
function sort(array)
{
	let sum = 1;

	while (sum != 0)
	{
		sum = 1;

		for (let index = 0; index < array.length - 1; index++)
		{
			if (array[index] > array[index + 1])
			{
				[array[index], array[index + 1]] =
				[array[index + 1], array[index]];
				sum++;
			}	
		}

		if (sum === 1)
		{
			sum = 0;
		}
	}
}
*/

/*
function sort(array)
{
	let sum = 1;

	for (let index = 0; index < array.length - 1; index++)
	{
		if (array[index] > array[index + 1])
		{
			[array[index], array[index + 1]] =
			[array[index + 1], array[index]];
			sum++;
		}	
	}

	if (sum === 1)
	{
		clearInterval(interval);
	}

}

function timed()
{
	print(array);
	sort(array);
}
*/

let index = 0;
let sum = 0;
let iteration = 0;

function timed()
{
	print(array);

	if (array[index] > array[index + 1])
	{
		[array[index], array[index + 1]] =
		[array[index + 1], array[index]];

		sum++;
	}	

	index++;
	iteration++;

	if (index === length - 1 && sum === 0)
	{
		console.log('Number of iterations: ' + iteration);
		clearInterval(interval);
	}

	if (index === length - 1)
	{
		index = 0;
		sum = 0;
	}
}


var interval = setInterval(timed, 1);
