const a1 = [9,9,9,9,9,9,9];
const a2 = [9,9,9,9];

class ListNode {
	constructor (value) {
		this.val = value;
		this.next = null;
	}
};

const node1 = new ListNode(a1.shift());
let head = node1;
for (const item of a1) {
	head.next = new ListNode(item);
	head = head.next;
};

const node2 = new ListNode(a2.shift());
head = node2;
for (const item of a2) {
	head.next = new ListNode(item);
	head = head.next;
};


var addTwoNumbers = function(l1, l2) {
	let carry = 0;
	let sum = l1.val + l2.val;
	if (sum >= 10) { 
		sum -= 10;
		carry++;
	};
	let result = new ListNode(sum);

	let head1 = l1;
	let head2 = l2;
	let head3 = result;

	while (true) {
		if (head1) head1 = head1.next;
		if (head2) head2 = head2.next;
		if (!head1 && !head2) break;
		let n1 = 0;
		let n2 = 0;
		if (head1) n1 = head1.val;
		if (head2) n2 = head2.val;
		let sum = n1 + n2 + carry; 
		if (carry > 0) carry = 0;
		if (sum >= 10) { sum -= 10; carry++ };
		head3.next = new ListNode(sum);
		head3 = head3.next;
	};
	if (carry > 0) head3.next = new ListNode(carry);

	return result;
};

console.log(addTwoNumbers(node1, node2));

/*
const a1 = [9,9,9,9,9,9,9];
const a2 = [9,9,9,9];

class node {
	constructor (value) {
		this.value = value;
		this.next = null;
	}
};

const node1 = new node(a1.shift());
let head = node1;
for (const item of a1) {
	head.next = new node(item);
	head = head.next;
};

const node2 = new node(a2.shift());
head = node2;
for (const item of a2) {
	head.next = new node(item);
	head = head.next;
};

let [result, carry] = [[], 0];
let [head1, head2] = [node1, node2];
while (head1 || head2) {
	let [n1, n2] = [0, 0];
	if (head1) {
		n1 = head1.value;
		head1 = head1.next;
	};
	if (head2) {
		n2 = head2.value;
		head2 = head2.next;
	};

	const sum = n1 + n2 + carry;
	if (carry > 0) carry = 0;
	if (sum >= 10) { result.push(sum - 10); carry++ }
	else result.push(sum); 
};
result.push(carry);

const node3 = new node(result.shift());
head = node3;

for (const item of result) {
	head.next = new node(item);
	head = head.next;
};
*/

/*
class node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
};

const a1 = [2,4,3];
const a2 = [5,6,4];

const intoListNode = function (array) {
	let head = new node(array[0]);
	let pointer = head;

	for (let index = 1; index < array.length; index++) {
		let next = new node(array[index]);
		pointer.next = next;
		pointer = next;
	};

	return head;
};

const l1 = intoListNode(a1);
const l2 = intoListNode(a2);

var addTwoNumbers = function (a, b) {
	let a_index = a;
	let b_index = b;

	let sum = a_index.value + b_index.value;
	let carry = 0;
	let result;
	if (sum >= 10) { result = new node(sum - 10); carry++; }
	else { result = new node(sum); };

	let current = result;

	while (a_index !== null && b_index !== null) {
		let total = a_index.value + b_index.value + carry;
		if (carry > 0) carry = 0;
		current.next = new node(total);
		current = current.next;
		a_index = a_index.next;
		b_index = b_index.next;
		console.log(total);
	};

	return result;
};

console.log(addTwoNumbers(l1, l2));
*/
