let price = 1.87;
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
	['PENNY', 0],		// 0
	['NICKEL', 0],		// 1
	['DIME', 0],		// 2
	['QUARTER', 0],		// 3
	['ONE', 0],		// 4
	['FIVE', 0],		// 5
	['TEN', 0],		// 6
	['TWENTY', 0],		// 7
	['ONE HUNDRED', 0]	// 8
];

const total_html	= document.querySelector('#total');
const cid_html		= document.querySelector('#cid');
const cash_html		= document.querySelector('#cash');
const purchase_html	= document.querySelector('#purchase-btn');
const change_html	= document.querySelector('#change-due');

total.innerText = `Total: $${price}`;

display_cid();
function display_cid()	{
	const cid_table = [];
	cid.forEach(item => {
		cid_table.push(`<tr><td>${item[0].toLowerCase()}</td><td>$${item[1]}</td></tr>`);
	});
	cid_html.innerHTML = cid_table.join('');
};

purchase_html.addEventListener('click', () => {
	const cash_in = Math.round(parseFloat(cash.value) * 100);
	if (cash_in < 0 || isNaN(cash_in)) return alert('Invalid input');
	if (cash_in < Math.round(price * 100)) return alert('Customer does not have enough money to purchase the item');
	if (cash_in === Math.round(price * 100)) return change_html.innerText = 'No change due - customer paid with exact cash';

	change = change.map(item => [item[0], 0]); // reset change
	let change_due = cash_in - price * 100;
	let cid_temp = mul100(cid);
	let lacking = false; while (change_due > 0 && !lacking) { filter_cid(); };
	function filter_cid() {
		if (cid_temp[8][1] >= 10000 && change_due - 10000 >= 0) { cid_temp[8][1] -= 10000; change_due -= 10000; change[8][1] += 10000; return; }
		if (cid_temp[7][1] >=  2000 && change_due -  2000 >= 0) { cid_temp[7][1] -=  2000; change_due -=  2000; change[7][1] +=  2000; return; }
		if (cid_temp[6][1] >=  1000 && change_due -  1000 >= 0) { cid_temp[6][1] -=  1000; change_due -=  1000; change[6][1] +=  1000; return; }
		if (cid_temp[5][1] >=   500 && change_due -   500 >= 0) { cid_temp[5][1] -=   500; change_due -=   500; change[5][1] +=   500; return; }
		if (cid_temp[4][1] >=   100 && change_due -   100 >= 0) { cid_temp[4][1] -=   100; change_due -=   100; change[4][1] +=   100; return; }
		if (cid_temp[3][1] >=    25 && change_due -    25 >= 0) { cid_temp[3][1] -=    25; change_due -=    25; change[3][1] +=    25; return; }
		if (cid_temp[2][1] >=    10 && change_due -    10 >= 0) { cid_temp[2][1] -=    10; change_due -=    10; change[2][1] +=    10; return; }
		if (cid_temp[1][1] >=     5 && change_due -     5 >= 0) { cid_temp[1][1] -=     5; change_due -=     5; change[1][1] +=     5; return; }
		if (cid_temp[0][1] >=     1 && change_due -     1 >= 0) { cid_temp[0][1] -=     1; change_due -=     1; change[0][1] +=     1; return; }
		lacking = true;
	};

	if (lacking) return change_html.innerText = 'Status: INSUFFICIENT_FUNDS';

	cid = div100(cid_temp); display_cid();
	const change_string = div100(change).map(item => { if (item[1] !== 0) return `${item[0]}: $${item[1]}`; }).join(' ');

	let count = 0; cid.forEach(item => { if (item[1] === 0) count++; });
	if (count === 9) return change_html.innerText = `Status: CLOSED\n${change_string}`;
	return change_html.innerText = `Status: OPEN\n${change_string}`;

	function mul100 (array) { return array.map(item => [item[0], Math.round(item[1] * 100)]); };
	function div100 (array) { return array.map(item => [item[0], item[1] / 100]); };
});
