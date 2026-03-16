const TOTAL_RECORDS = 10_000_000;

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const STATUSES = [200, 201, 204, 400, 401, 403, 404, 500];
const RESOURCES = [
	"users",
	"orders",
	"products",
	"payments",
	"invoices",
	"analytics",
	"auth",
	"sessions",
	"notifications",
	"reports",
];

const randomInt = (max) => Math.floor(Math.random() * max);

const createRecord = (id) => {
	const resource = RESOURCES[randomInt(RESOURCES.length)];

	return {
		id,
		name: `${resource}-${id}`,
		method: METHODS[randomInt(METHODS.length)],
		status: STATUSES[randomInt(STATUSES.length)],
		latencyMs: randomInt(2000) + 20,
		timestamp: Date.now() - randomInt(1000 * 60 * 60 * 24 * 30),
	};
};

// Lazily yields 10 million rows to avoid loading the entire dataset in memory.
function* generateRandomData(count = TOTAL_RECORDS) {
	for (let i = 1; i <= count; i += 1) {
		yield createRecord(i);
	}
}

const data = generateRandomData(TOTAL_RECORDS);

module.exports = {
	TOTAL_RECORDS,
	data,
	generateRandomData,
};
