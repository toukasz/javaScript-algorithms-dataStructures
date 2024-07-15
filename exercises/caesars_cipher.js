function rot13(str) {
	let decoded = '';
	for (let index = 0; index < str.length; index++) {
		const number = str.charCodeAt(index);
		if (number > 77 && number < 91) decoded += String.fromCharCode(number - 13);
		if (number < 78 && number > 64) decoded += String.fromCharCode(number + 13);
		if (number > 90 || number < 65) decoded += str[index];
	}
	return decoded;
}

console.log(rot13("GUR DHVPX OEBJA SBK... WHZCF BIRE GUR YNML QBT."));
