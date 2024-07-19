var convert = function(s, numRows) {
	if (s.length <= numRows)
		return s;
	if (numRows === 1)
		return s;

	let zig = Array.from({length: numRows}, x => []);

	let row = 0;
	let direction;
	for (let index = 0; index < s.length; index++) {
		switch (row) {
			case 0:
			direction = +1;
			break;
			case numRows - 1:
			direction = -1;
		};
		zig[row].push(s.charAt(index));
		row += direction;
	};

	return Array.from(zig, row => row.reduce((a, b) => a + b))
		.reduce((a, b) => a + b);
};
