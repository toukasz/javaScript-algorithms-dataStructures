var threeSumClosest = function (nums, target) {
	nums.sort((a, b) => a - b);
	let closest = 0;
	let min = Number.MAX_VALUE;
	for (let a = 0; a < nums.length; a++) {
		let b = a + 1;
		let c = nums.length - 1;
		while (b < c) {
			let sum = nums[a] + nums[b] + nums[c];
			if (sum == target)
				return target;
			if (sum < target)
				b++;
			else
				c--;
			let diff = Math.abs(sum - target);
			if (diff < min) {
				min = diff;
				closest = sum;
			};
		};
	};
	return closest;
};

const nums = [-1,2,1,-4];
const target = 1;
console.log(threeSumClosest(nums, target));

/*
var threeSumClosest = function (nums, target) {
	let sums = [];
	let diff = [];
	let index = 0;
	for (let a = 0; a < nums.length - 2; a++)
	for (let b = a + 1; b < nums.length - 1; b++)
	for (let c = b + 1; c < nums.length; c++)
		sums.push(nums[a] + nums[b] + nums[c]);
	for (let i = 0; i < sums.length; i++)
		diff.push(Math.abs(sums[i] - target));
	let min = diff[0];
	for (let i = 0; i < diff.length; i++)
	if (diff[i] < min) {
		min = diff[i];
		index = i;
	};
	return sums[index];
};
*/
