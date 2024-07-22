var reverse = function(x) {
	const ans = (x >= 0)
		? parseInt(x.toString().split("").reverse().join(""))
		: -parseInt(x.toString().split("").reverse().join(""));
	if (ans > 2147483647 || ans < -2147483648)
		return 0;
	return ans;
};

console.log(reverse(123));
