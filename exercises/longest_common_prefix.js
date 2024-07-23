var longestCommonPrefix = function (strs) {
	for (let index = 0; index < strs.length; index++)
		strs[index] = strs[index].split("");

	let limit = strs[0].length;
	for (let index = 1; index < strs.length; index++)
		if (strs[index].length < limit) limit = strs[index].length;

	let string = "";
	for (let count = 0; count < limit; count++) {
		let check = strs[0][count];
		for (let index = 1; index < strs.length; index++)
			if (strs[index][count] !== check) check = false;
		if (!check) break;
		string += check;
	};
	return string;
};

const strings = ["flower","flow","flight"];
console.log(longestCommonPrefix(strings));
