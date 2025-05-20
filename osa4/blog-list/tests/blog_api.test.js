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

	test("should return the created blog and increment the document's length", async () => {
		const initialBlogsCount = (await helper.blogsInDb()).length;

		const newBlog = {
			title: "Create from test",
			author: "Test Author",
			url: "http://google.com",
			likes: 2,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");

		const titles = response.body.map((r) => r.title);

		assert.strictEqual(response.body.length, initialBlogsCount + 1);

		assert(titles.includes("Create from test"));
	});
});

after(async () => {
	await mongoose.connection.close();
});
