function checkCashRegister(price, cash, cid) {
	let [change, drawer, count, unit, index] = [
		(cash - price) * 100,
		Array.from(cid, item => [item[0], Math.round(item[1] * 100)]),
		Array.from(cid, item => [item[0], 0]),
		[1, 5, 10, 25, 100, 500, 1000, 2000, 10000],
		cid.length - 1
	];

	while (index >= 0) {
		if (change - unit[index] >= 0 && drawer[index][1] - unit[index] >= 0) {
			change -= unit[index];
			drawer[index][1] -= unit[index];
			count[index][1] += unit[index];
		} else index--;
	};

	count = Array.from(count, item => [item[0], item[1] / 100]);

	let sum = 0; Array.from(drawer, item => sum += item[1]);
	if (sum === 0 && change === 0) return {status: "CLOSED", change: count};

	count = count.filter(item => item[1] > 0).reverse();
	if (change === 0) return {status: "OPEN", change: count};

	return {status: "INSUFFICIENT_FUNDS", change: []};
};

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
