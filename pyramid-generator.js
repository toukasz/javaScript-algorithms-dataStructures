process.stdout.write('\x1Bc');

const end = 10;
const inverse = true;
let array = [];

function arrayPrint(numb, end) {
	return ".".repeat(end - numb) + "#".repeat(2 * numb + 1) + ".".repeat(end - numb);
}


// Pyramid Printer

console.log('Pyramid Generator');

for (let numb = 0; numb <= end; numb++) {
	if (inverse) {
		console.log(arrayPrint(end - numb, end));
	} else {
		console.log(arrayPrint(numb, end));
	}
}


// Side Pyramid Printer

console.log('\nSide-ways Pyramid Generator');

function arraySide(numb, end) {
	return "#".repeat(2 * numb + 1) + ".".repeat(2 * (end - (2 * numb))) + ".." + "#".repeat(2 * numb + 1);
}

for (let numb = 0; numb <= end; numb++) {
	if (numb < end / 2) {
		console.log(arraySide(numb, end));
	} else {
		console.log(arraySide((end - numb), end));
	}
}


// Pyramid Generator using "while"

console.log('\nPyramid Generator using "while"');

while (array.length < end) {
	array.push(arrayPrint(array.length, end));
}

for (let i = 0; i < end; i++) {
	console.log(array.at(i));
}


// Pyramid Generator using "do...while"

console.log('\nPyramid Generator using "do...while"');

let n = 0;
do {
	if (inverse) {
		console.log(arrayPrint((end - n), end));
		n++;
	} else {
		console.log(arrayPrint(n, end));
		n++;
	}
} while (n <= end);
