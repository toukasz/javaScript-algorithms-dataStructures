let price = 19.50;
let cid = [
	['PENNY', 1.01],
	['NICKEL', 2.05],
	['DIME', 3.1],
	['QUARTER', 4.25],
	['ONE', 90],
	['FIVE', 55],
	['TEN', 20],
	['TWENTY', 60],
	['ONE HUNDRED', 100]
];
let change = [
	['PENNY', 0],           // 0
	['NICKEL', 0],          // 1
	['DIME', 0],            // 2
	['QUARTER', 0],         // 3
	['ONE', 0],             // 4
	['FIVE', 0],            // 5
	['TEN', 0],             // 6
	['TWENTY', 0],          // 7
	['ONE HUNDRED', 0]      // 8
];

const total = document.querySelector('#total');
const cid_table = document.querySelector('#cid');
const cash = document.querySelector('#cash');
const purchase = document.querySelector('#purchase-btn');
const change_due = document.querySelector('#change-due');

total.innerText = `Total: $${price}`;

const cid_html = [];
cid.forEach(item => { cid_html.push(`<tr><td>${item[0].toLowerCase()}</td><td>$${item[1]}</td></tr>`); });
cid_table.innerHTML = cid_html.join('');

purchase.addEventListener('click', () => {
	function cash_filter() {
		if (cid[8][1] >= 10000 && cash_return - 10000 >= 0)	{ change[8][1] += 10000; cid[8][1] -= 10000; cash_return -= 10000; return true; };
		if (cid[7][1] >= 2000 && cash_return - 2000 >= 0)	{ change[7][1] += 2000; cid[7][1] -= 2000; cash_return -= 2000; return true; };
		if (cid[6][1] >= 1000 && cash_return - 1000 >= 0)	{ change[6][1] += 1000; cid[6][1] -= 1000; cash_return -= 1000; return true; };
		if (cid[5][1] >= 500 && cash_return - 500 >= 0)		{ change[5][1] += 500; cid[5][1] -= 500; cash_return -= 500; return true; };
		if (cid[4][1] >= 100 && cash_return - 100 >= 0)		{ change[4][1] += 100; cid[4][1] -= 100; cash_return -= 100; return true; };
		if (cid[3][1] >= 25 && cash_return - 25 >= 0)		{ change[3][1] += 25; cid[3][1] -= 25; cash_return -= 25; return true; };
		if (cid[2][1] >= 10 && cash_return - 10 >= 0)		{ change[2][1] += 10; cid[2][1] -= 10; cash_return -= 10; return true; };
		if (cid[1][1] >= 5 && cash_return - 5 >= 0)		{ change[1][1] += 5; cid[1][1] -= 5; cash_return -= 5; return true; };
		if (cid[0][1] >= 1 && cash_return - 1 >= 0)		{ change[0][1] += 1; cid[0][1] -= 1; cash_return -= 1; return true; };
		return false;
	}

	const cash_value = Math.round(parseFloat(cash.value) * 100);
	if (cash_value < price * 100) return alert('Customer does not have enough money to purchase the item');
	if (cash_value === price * 100) return change_due.innerText = 'No change due - customer paid with exact cash';
	let cash_return = cash_value - price * 100;
	cid = cid.map(item => [item[0], Math.round(item[1] * 100)]);
	let state = true;
	while (cash_return > 0 && state) { state = cash_filter(); };
	cid = cid.map(item => [item[0], item[1] / 100]);
	change = change.map(item => [item[0], item[1] / 100]);
	if (!state) change_due.innerText = `Status: INSUFFICIENT_FUNDS`;
	const cid_html = [];
	cid.forEach(item => { cid_html.push(`<tr><td>${item[0].toLowerCase()}</td><td>$${item[1]}</td></tr>`); });
	cid_table.innerHTML = cid_html.join('');
	const change_html = [];
	change.forEach(item => { if (item[1] > 0) change_html.push(`\n${item[0]}: $${item[1]}`); });
	change_due.innerText = 'Status: OPEN' + change_html.join('');
});
