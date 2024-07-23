var romanToInt = function (s) {
	let sum = 0;
	for (let index = 0; index < s.length; index++) {
		if (s.charAt(index) === "M") sum += 1000;
		if (s.charAt(index) === "D") sum += 500;
		if (s.charAt(index) === "C") {
			if (s.charAt(index) + s.charAt(index + 1) === "CD")
				{ sum += 400; index++ }
			else if (s.charAt(index) + s.charAt(index + 1) === "CM")
				{ sum += 900; index++ }
			else { sum += 100 };
		};
		if (s.charAt(index) === "L") sum += 50;
		if (s.charAt(index) === "X") {
			if (s.charAt(index) + s.charAt(index + 1) === "XL")
				{ sum += 40; index++ }
			else if (s.charAt(index) + s.charAt(index + 1) === "XC")
				{ sum += 90; index++ }
			else { sum += 10 };
		};
		if (s.charAt(index) === "V") sum += 5;
		if (s.charAt(index) === "I") {
			if (s.charAt(index) + s.charAt(index + 1) === "IV")
				{ sum += 4; index++ }
			else if (s.charAt(index) + s.charAt(index + 1) === "IX")
				{ sum += 9; index++ }
			else { sum += 1 };
		};
	};
	return sum;
};


const string = "MCMXCIV";
console.log(romanToInt(string));
