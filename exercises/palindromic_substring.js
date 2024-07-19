var longestPalindrome = function (string) {  
	function isPalindrome (check) {
		let a = 0;
		let b = check.length - 1;
		while (a < b) {
			if (check.charAt(a) !== check.charAt(b))
				return false;
			a++;
			b--;
		}
		return true;
	};

	let longest = "";

	let index = 0;
	while (index < string.length - Math.floor(longest.length / 2)) {
		let center = string.charAt(index);
		let left = index;
		let right = index;
		while (isPalindrome(center)) {
			if (longest.length === string.length)
				break;
			if (center.length > longest.length)
				longest = center;
			left--;
			right++;
			center = string.charAt(left) + center + string.charAt(right);
		}
		index++;
	}

	index = Math.floor(longest.length / 2);
	while (index < string.length - Math.floor(longest.length / 2)) {
		let center = string.charAt(index) + string.charAt(index + 1);
		let left = index;
		let right = index + 1;
		while (isPalindrome(center)) {
			if (longest.length === string.length)
				break;
			if (center.length > longest.length)
				longest = center;
			left--;
			right++;
			center = string.charAt(left) + center + string.charAt(right);
		}
		index++;
	}
	
	return longest;
};

const stringest = "abacab";

console.log(longestPalindrome(stringest));
