var array = [];
const length = 35;

for (let index = 0; index < length; index++)
{
	array.push(index + 1);
}

for (let index = 0; index < length; index++)
{
	let randomIndex = Math.floor(Math.random() * length);

	[array[index], array[randomIndex]] =
	[array[randomIndex], array[index]];
}

array = [array];


function findSplit(array)
{
	for (let index = 0; index < array.length; index++)
	{
		if (array[index].length > 1)
		{
			splitSort(array, index);
			return;
		}
	}

	clearInterval(interval);
}

let count = 0;

function splitSort(array, index)
{
	let left = [];
	let right = [];
	let subindex = array[index].length - 1;

	while (subindex !== 0)
	{
		if (array[index][subindex] < array[index][0])
		{
			left.push(array[index].pop());
		}
		if (array[index][subindex] > array[index][0])
		{
			right.push(array[index].pop());
		}

		count++;
		subindex--;
	}

	if (left.length !== 0 && right.length !== 0)
	{
		array.splice(index, 0, left);
		array.splice(index + 2, 0, right);
	}
	if (left.length === 0 && right.length !== 0)
	{
		array.splice(index + 1, 0, right);
	}
	if (left.length !== 0 && right.length === 0)
	{
		array.splice(index, 0, left);
	}
}


function print(array)
{
	process.stdout.write('\x1Bc');

	for (let index = 0; index < array.length; index++)
	{
		for (let subindex = 0; subindex < array[index].length; subindex++)
		{
			console.log('[]'.repeat(array[index][subindex]));
		}
	}

	console.log('Number of iterations: ' + count);
}


let interval = setInterval(timed, 500);

function timed()
{
	print(array);
	findSplit(array);
}
