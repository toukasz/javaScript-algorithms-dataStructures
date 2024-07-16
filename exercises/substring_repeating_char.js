var lengthOfLongestSubstring = function(s) {
	const list = s.split('');
	let longest = 0;
	for (let i = 0; i < list.length; i++) {
		let sub = [];
		let j = i;
		while (j < list.length) {
			(sub.includes(list[j])) ? j = list.length : sub.push(list[j]); 
			(sub.length > longest) ? longest = sub.length : null;
			j++;
		}
	}
	return longest;
};

console.log(lengthOfLongestSubstring("abcabcabbb"));
