var myAtoi = function(s) {
	s = parseInt(s.replace(/^ */, "")
		.match(/^[+-]{0,1}[0-9]*/)[0]);
	if (isNaN(s)) return 0;
	if (s > 2147483647) return 2147483647;
	if (s < -2147483648) return -2147483648;
	return s;
};

console.log(myAtoi("  -000214r:strst"));
