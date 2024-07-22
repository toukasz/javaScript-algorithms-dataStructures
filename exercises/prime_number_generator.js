/*
function generate(primes, number) {
	if (number >= 1000) return primes;
	for (const item of primes) if (number % item === 0)
		return generate(primes, number + 1);
	primes.push(number);
	process.stdout.write(number + " ");
	return generate(primes, number + 1);
}

console.log(generate([], 2));
*/

let primes = [2, 3];
let number = 4;
let count = 2;

while (true) {
	let index = 0;
	let isPrime = 0;
	while (index < primes.length) {
		if (number % primes[index] === 0) {
			isPrime++;
			break;
		}
		index++;
	}
	if (isPrime === 0) {
		primes.push(number);
		count++;
		console.log(count + "\t" + number);
	}
	number++;
}
