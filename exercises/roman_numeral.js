function convertToRoman(number) {
	let string = '';
	while (number - 1000 >= 0) {
		number = number - 1000;
		string += 'M';
	}
	while (number - 900 >= 0) {
		number = number - 900;
		string += 'CM';
	}
	while (number - 500 >= 0) {
		number = number - 500;
		string += 'D';
	}
	while (number - 400 >= 0) {
		number = number - 400;
		string += 'CD';
	}
	while (number - 100 >= 0) {
		number = number - 100;
		string += 'C';
	}
	while (number - 90 >= 0) {
		number = number - 90;
		string += 'XC';
	}
	while (number - 50 >= 0) {
		number = number - 50;
		string += 'L';
	}
	while (number - 40 >= 0) {
		number = number - 40;
		string += 'XL';
	}
	while (number - 10 >= 0) {
		number = number - 10;
		string += 'X';
	}
	while (number - 9 >= 0) {
		number = number - 9;
		string += 'IX';
	}
	while (number - 5 >= 0) {
		number = number - 5;
		string += 'V';
	}
	while (number - 4 >= 0) {
		number = number - 4;
		string += 'IV';
	}
	while (number - 1 >= 0) {
		number = number - 1;
		string += 'I';
	}
	return string;
}

console.log(convertToRoman(83));
