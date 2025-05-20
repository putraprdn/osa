const { test, after, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");

const api = supertest(app);

describe("blog api", () => {
	test("is returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("return the correct data length", async () => {
		const response = await api.get("/api/blogs");

		assert.strictEqual(response.body.length, 0);
	});
});

after(async () => {
	await mongoose.connection.close();
});
