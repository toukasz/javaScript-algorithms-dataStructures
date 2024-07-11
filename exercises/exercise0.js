const Person = function(first, last) {
	let firstName = first;
	let lastName = last;

	this.getFirstName = function() { return firstName };
	this.getLastName = function() { return lastName };
	this.getFullName = function() { return firstName + ' ' + lastName };

	this.setFirstName = function(first) { return firstName = first };
	this.setLastName = function(last) { return lastName = last };
	this.setFullName = function(first, last) {
		firstName = first;
		lastName = last;
		return this.getFullName;
	};
};

function addTogether() {
	const [a, b] = arguments;
	if (typeof(a) !== 'number') return undefined;
	if (arguments.length === 1) return (b) => addTogether(a, b);
	if (typeof(a) === 'number' && typeof(b) === 'number') return a + b;
	return undefined;
}

function truthCheck(collection, pre) {
	let count = 0;
	for (const item of collection) {
		(item[pre]) ? null : count++;
	}
	(count) ? count = false : count = true;
	return count;
}

console.log(truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "isBot"));

function binaryAgent(str) {
	str = str.split(' ');
	let convert = '';
	for (const item of str) {
		convert += String.fromCharCode(parseInt(item, 2));
	}
	return convert;
}

console.log(binaryAgent("01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001"));

function steamrollArray(arr) {
	const unnested = [];
	for (const index of arr) {
		(Array.isArray(index) === false)
			? unnested.push(index)
			: unnested.push(...steamrollArray(index));
	}
	return unnested;
}

console.log(steamrollArray([1, {}, [3, [[4]]]]));

function steamrollArray(arr) {
	return Array.from(arr.toString().split(','), (num) => parseInt(num));
}

function dropElements(arr, func) {
	if (arr.length === 0) {
		return arr;
	}
	if (func(arr[0])) {
		return arr;
	}
	arr.shift();
	return dropElements(arr, func);
}

console.log(dropElements([1, 2, 3, 9, 2], function(n) {return n > 2;}));

function smallestCommons(arr) {
	arr.sort((a, b) => a - b);
	const [min, max] = [arr[0], arr[1]];
	const limit = () => {
		let numb = 1;
		for (let index = min; index <= max; index++) {
			numb *= index; }
		return numb; };
	for (let lcm = max; lcm <= limit(); lcm += max) {
		let checks = 0;
		for (let numb = min; numb <= max; numb++) {
			if (lcm % numb === 0) {
				checks++; }}
		if (checks === max - min + 1) {
			return lcm; }}}

console.log(smallestCommons([23, 18]));
