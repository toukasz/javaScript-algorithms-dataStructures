// https://leetcode.com/problems/regular-expression-matching/

var isMatch = function(s, p) {
	p = p.replace(/\*{1,}/g, "*");
	return new RegExp(`^${p}$`).test(s);
};

const s = "aa";
const p = "a*****";
console.log(
	isMatch(s, p)
);


/*
var isMatch = function(s, p) {
	let astr;
	if (/[^\*]\*{2,}/.test(p)) {
		astr = p.match(/\*+/)[0].split("");
		for (let i = 1; i < astr.length; i += 3)
			astr.splice(i, 0, "\\");
		p = p.replace(/\*{2,}/, astr.join(""))
	} else if (/^\*+/.test(p)) {
		astr = p.match(/\*+/)[0].split("");
		for (let i = 0; i < astr.length; i += 3)
			astr.splice(i, 0, "\\");
		p = p.replace(/\*+/, astr.join(""))
	}
	const r = new RegExp(`^${p}$`);
	return r.test(s);
};
*/
