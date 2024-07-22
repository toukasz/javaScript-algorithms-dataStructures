var maxArea = function (height) {
	let a = 0;
	let b = height.length - 1;
	let max = 0;
	while (a < b) {
		const h = (height[a] < height[b]) ? height[a] : height[b];
		const vol = h * (b - a);
		if (vol > max) max = vol;
		(height[a] < height[b]) ? a++ : b--;
	};
	return max;
};

const height = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(height));

/*
// BRUTE-FORCE METHOD
var maxArea = function (height) {
	let max = 0;
	for (let a = 0; a < height.length; a++)
	for (let b = a + 1; b < height.length; b++) {
		const w = b - a;
		const h = (height[a] < height[b]) ? height[a] : height[b];
		if (w * h > max) max = w * h;
	};
	return max;
};
*/
