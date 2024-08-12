const textInput = document.getElementById("text-input");
const checkButton = document.querySelector("#check-btn");
const result = document.getElementById("result");

textInput.placeholder = "e.g. detartrated";

const isEmptyString = function (string) {
	if (!string) {
		alert("Please input a value");
		result.style.display = "none";
		return !string;
	};
};
const filterString = function (string) {
	const lowerCaseString = string.toLowerCase();
	const notLetters = /[^a-z0-9]/g;
	return lowerCaseString.replace(notLetters, "");
};
const checkPalindrome = function (string) {
	const splitString = string.split("");
	let a = 0;
	let b = splitString.length - 1;
	let isPalindrome = true;
	while (a < b) {
		if (splitString[a] !== splitString[b]) {
			isPalindrome = false;
			break;
		};
		a++;
		b--;
	};
	return isPalindrome;
};
const printResult = function (state, string) {
	result.style.display = "block";
	if (state) {
		result.innerText = `${string} is a palindrome`;
	} else {
		result.innerText = `${string} is not a palindrome`;
	};
};
const clearInput = () => textInput.value = "";

const checkInput = function () {
	const inputString = textInput.value;
	if (isEmptyString(inputString)) return;
	const onlyLetters = filterString(inputString);
	const isPalindrome = checkPalindrome(onlyLetters);
	printResult(isPalindrome, inputString);
	clearInput();
};

checkButton.onclick = checkInput;
