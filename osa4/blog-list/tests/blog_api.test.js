const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});

describe("blog api", () => {
	test("is returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("return the correct data length", async () => {
		const response = await api.get("/api/blogs");

		assert.strictEqual(response.body.length, 3);
	});

	test("should have id", async () => {
		const response = await api.get("/api/blogs");

		assert(response.body.length > 0, "Response body should not be empty");

		response.body.forEach((blog) => {
			assert.strictEqual(
				typeof blog.id,
				"string",
				"Each blog should have an id of type string"
			);
		});
	});
	});
});

after(async () => {
	await mongoose.connection.close();
});
