const [height, width] = [5, 6];

const bombScatter = () => (Math.random() <= 0.2) ? 1 : 0;
const row = () => Array.from({length: width}, () => [bombScatter(), NaN, NaN]);
const grid = Array.from({length: height}, () => row());

const ascii = (value) => (value === 1) ? 'B ' : '. ';
const string = (y) => Array.from(grid[y], (x) => ascii(x[0])).join('');
const print = () => Array.from(grid, (x) => string(grid.indexOf(x))).join('\n');

console.log(print());
