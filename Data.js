const TOTAL_RECORDS = 10_000_000;
const MIN_VALUE = 10;
const MAX_VALUE = 99;

function generateNumberArray(count = TOTAL_RECORDS, min = MIN_VALUE, max = MAX_VALUE) {
	const arr = new Uint8Array(count);
	const range = max - min + 1;

	for (let i = 0; i < count; i += 1) {
		arr[i] = Math.floor(Math.random() * range) + min;
	}

	return arr;
}

const data = generateNumberArray();

module.exports = {
	TOTAL_RECORDS,
	MIN_VALUE,
	MAX_VALUE,
	data,
	generateNumberArray,
};
