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

function postmanSortRecursive(arr, start, end, base) {
	if (base < 1 || end - start <= 1) {
		return;
	}

	const buckets = Array.from({ length: 10 }, () => []);

	for (let i = start; i < end; i += 1) {
		const digit = Math.floor(arr[i] / base) % 10;
		buckets[digit].push(arr[i]);
	}

	let current = start;
	for (let i = 0; i < 10; i += 1) {
		const bucketSize = buckets[i].length;
		if (bucketSize === 0) {
			continue;
		}

		for (let j = 0; j < bucketSize; j += 1) {
			arr[current + j] = buckets[i][j];
		}

		postmanSortRecursive(arr, current, current + bucketSize, base / 10);
		current += bucketSize;
	}
}

function postmanSort(arr) {
	if (!arr || arr.length <= 1) {
		return arr;
	}

	let max = arr[0];
	for (let i = 1; i < arr.length; i += 1) {
		if (arr[i] > max) {
			max = arr[i];
		}
	}

	let base = 1;
	while (Math.floor(max / base) >= 10) {
		base *= 10;
	}

	postmanSortRecursive(arr, 0, arr.length, base);
	return arr;
}

module.exports = {
	TOTAL_RECORDS,
	MIN_VALUE,
	MAX_VALUE,
	data,
	generateNumberArray,
	postmanSortRecursive,
	postmanSort,
};
