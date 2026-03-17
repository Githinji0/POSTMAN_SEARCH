const { data, MIN_VALUE, MAX_VALUE } = require("./Data");

function buildSearchIndex(arr, min = MIN_VALUE, max = MAX_VALUE) {
	const range = max - min + 1;
	const frequency = new Uint32Array(range);
	const firstIndex = new Int32Array(range);
	const lastIndex = new Int32Array(range);

	firstIndex.fill(-1);
	lastIndex.fill(-1);

	for (let i = 0; i < arr.length; i += 1) {
		const value = arr[i];
		if (value < min || value > max) {
			continue;
		}

		const idx = value - min;
		frequency[idx] += 1;
		if (firstIndex[idx] === -1) {
			firstIndex[idx] = i;
		}
		lastIndex[idx] = i;
	}

	return {
		min,
		max,
		frequency,
		firstIndex,
		lastIndex,
		total: arr.length,
	};
}

function postmanSearch(index, target) {
	if (target < index.min || target > index.max) {
		return {
			target,
			found: false,
			count: 0,
			firstIndex: -1,
			lastIndex: -1,
		};
	}

	const idx = target - index.min;
	const count = index.frequency[idx];

	return {
		target,
		found: count > 0,
		count,
		firstIndex: index.firstIndex[idx],
		lastIndex: index.lastIndex[idx],
	};
}

function runDemo(target = 42) {
	console.time("index-build");
	const index = buildSearchIndex(data);
	console.timeEnd("index-build");

	console.time("search");
	const result = postmanSearch(index, target);
	console.timeEnd("search");

	console.log("result", result);
}

if (require.main === module) {
	const arg = Number(process.argv[2]);
	const target = Number.isNaN(arg) ? 42 : arg;
	runDemo(target);
}

module.exports = {
	buildSearchIndex,
	postmanSearch,
	runDemo,
};