function telephoneCheck(str) {
	if (/^1{0,1} {0,1}\([0-9]{3}\) {0,1}[0-9]{3}-[0-9]{4}$/.test(str)) return true;
	if (/^(1 ){0,1}[0-9]{3} [0-9]{3} [0-9]{4}$/.test(str)) return true;
	if (/^1{0,1} {0,1}[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(str)) return true;
	if (/^1{0,1}[0-9]{3}[0-9]{3}[0-9]{4}$/.test(str)) return true;
	return false;
}

console.log(telephoneCheck("555-5555"));
