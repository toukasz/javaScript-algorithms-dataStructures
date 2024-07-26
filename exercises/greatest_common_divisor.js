const gcd = function (a, b) {
	if (a < b) [a, b] = [b, a];
	while (true) {
		let r = a % b;
		if (r === 0) return b;
		[a, b] = [b, r];
	};
};

const a = 1701;
const b = 3768;
console.log(gcd(a, b));
