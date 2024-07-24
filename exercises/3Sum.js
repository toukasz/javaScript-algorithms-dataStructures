var threeSum = function (nums) {
	let input = nums;
	let output = [];
	for (let a = 0; a < input.length - 2; a++)
	for (let b = a + 1; b < input.length - 1; b++)
	for (let c = b + 1; c < input.length; c++)
	if (input[a] + input[b] + input[c] === 0) {
		const query = [input[a], input[b], input[c]].sort((a, b) => a - b);
		let count = 0;
		for (const item of output)
		if (item.toString() === query.toString())
			count++;
		if (count === 0)
			output.push(query);
	};
	return output;
};

const nums = [-1,0,1,2,-1,-4];
console.log(threeSum(nums));


/*
var threeSum = function (nums) {
	let input = [];
	for (const item of nums)
	if (!input.includes(item))
		input.push(item);
	let output = [];
	for (let a = 0; a < input.length - 2; a++)
	for (let b = a + 1; b < input.length - 1; b++)
	for (let c = b + 1; c < input.length; c++)
	if (input[a] + input[b] + input[c] === 0) {
		const query = [input[a], input[b], input[c]].sort((a, b) => a - b);
		let count = 0;
		for (const item of output)
		if (item.toString() === query.toString())
			count++;
		if (count === 0)
			output.push(query);
	};
	return output;
};

const nums = [-1,0,1,2,-1,-4];
console.log(threeSum(nums));
*/
