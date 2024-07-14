function palindrome(str) {
	const former = str.toLowerCase().replace(/([^a-z0-9])/g, '');
	const latter = former.split('').reverse().join('');
	return (former === latter) ? true : false;
}

console.log(palindrome("A man, a plan, a canal. Panama"));
