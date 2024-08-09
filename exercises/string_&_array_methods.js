// find()
const array = ["zero", "one", "two", "three", "four"];
const found = array.find((item) => item === "one");
console.log(found);

// forEach()
const list = [0, 1, 2, 3, 4];
list.forEach((number) => console.log(number * 2));

// map()
const numbers1 = [0, 10, 20, 30, 40];
const numbers0 = numbers1.map(x => x / 10);
console.log(numbers1, numbers0);

// join()
const array_string = array.join(" ");
console.log(array_string);
