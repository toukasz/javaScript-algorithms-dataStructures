const length = 20; // Temporary value; to be turned into random generation.

const inquiryNumber = randomInteger();
const sortedList = pushIntoArray(length).sort(function(a, b)
{
	return a - b;
});


function randomInteger()
{
	const randomNumber = Math.random();

	return Math.round(randomNumber * 100);
}

function pushIntoArray(length)
{
	let array = [];

	for (let i = 0; i < length; i++)
	{
		array.push(randomInteger());
	}

	return array;
}

function discardExceededValues(array, inquiryNumber)
{
	let loop = true;

	while (loop)
	{
		if (array[array.length - 1] <= inquiryNumber)
		{
			loop = false;
		}

		if (array.length == 3)
		{
			loop = false;
		}

		array.pop();
	}

	return array;
}

function checkSum(number_1, number_2, number_3)
{
	if (number_1 + number_2 == number_3)
	{
		return true;
	}

	return false;
}

function general(array, number)
{
	for (let index = 0; index < array.length - 1; index++)
	{
		if (checkSum(array[index], array[array.length - 1], number))
		{
			return "Huraah";
		}
	}

	if (array.length == 2)
	{
		return "None";
	}

	array.pop();
	process.stdout.write(array.toString());
	general(array, number);
}

console.log(inquiryNumber);
console.log(sortedList.toString());
console.log(discardExceededValues(sortedList, inquiryNumber));

console.log(general(sortedList, inquiryNumber));
