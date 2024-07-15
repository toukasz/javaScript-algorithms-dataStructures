var twoSum = function (nums, target) {
	for (let a = 0; a < nums.length; a++) {
		for (let b = 0; b < nums.length; b++) {
			let sum = nums[a] + nums[b];
			if (a !== b && sum === target) return [a, b];
		}
	}
}

const nums = [3, 2, 4];
const target = 6;

console.log(twoSum(nums, target));
