var isPalindrome = function(x) {
	const list = x.toString().split('');
	let [a, b] = [0, list.length - 1];
	while (a < b) {
		if (list[a] !== list[b])
			return false;
		a++;
		b--;
	}
	return true;
}

const x = 12321;
console.log(isPalindrome(x));
