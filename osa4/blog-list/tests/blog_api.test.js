const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const api = supertest(app);

describe("blog api", () => {
	let token;
	let user;

	beforeEach(async () => {
		await Blog.deleteMany({});
		await Blog.insertMany(helper.initialBlogs);

		// Clear users and create a test user
		await User.deleteMany({});

		// Create a user for authentication
		user = new User({
			username: "testuser",
			name: "Test User",
			password: await bcrypt.hash("testpassword", 10),
		});
		await user.save();

		// Generate token for the test user
		token = helper.generateToken(user);
	});

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

	describe("addition of a new blog", () => {
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
				.set("Authorization", `Bearer ${token}`)
				.send(newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const response = await api.get("/api/blogs");
			const titles = response.body.map((r) => r.title);

			assert.strictEqual(response.body.length, initialBlogsCount + 1);
			assert(titles.includes("Create from test"));
		});

		test("should have default value for 'likes' when create new blog", async () => {
			const newBlog = {
				title: "Create without likes",
				author: "My Author",
				url: "http://google.com",
			};

			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const response = await api.get("/api/blogs");

			const createdBlog = response.body.find(
				(blog) => blog.title === newBlog.title
			);

			assert.strictEqual(createdBlog.title, newBlog.title);
			assert.ok(
				Object.hasOwn(createdBlog, "likes"),
				"Blog should have 'likes' key"
			);
			assert.strictEqual(
				createdBlog.likes,
				0,
				"Likes should default to 0"
			);
		});

		test("should return status 400 is title of url is empty", async () => {
			const newBlogWithoutURL = {
				title: "Create without url",
				author: "My Author",
				// url: "http://google.com",
			};

			await api
				.post("/api/blogs")
				.send(newBlogWithoutURL)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			const newBlogWithoutTitle = {
				// title: "Create without title",
				author: "My Author",
				url: "http://google.com",
			};

			await api
				.post("/api/blogs")
				.send(newBlogWithoutTitle)
				.expect(400)
				.expect("Content-Type", /application\/json/);
		});

		test("should fail to create blog without valid token", async () => {
			const newBlog = {
				title: "Unauthorized Blog",
				author: "Test Author",
				url: "http://unauthorized.com",
				likes: 0,
			};

			await api.post("/api/blogs").send(newBlog).expect(401);
		});
	});

	describe("deletion of an existing blog", () => {
		test("should return status code 204 when deleting own blog", async () => {
			const newBlog = {
				title: "Blog to Delete",
				author: "Test Author",
				url: "http://delete-test.com",
				likes: 0
			};

			const createResponse = await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(newBlog)
				.expect(201);

			const createdBlog = createResponse.body;

			await api
				.delete(`/api/blogs/${createdBlog.id}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(204);

			const blogsAfterDeletion = await helper.blogsInDb();
			const deletedBlog = blogsAfterDeletion.find(b => b.id === createdBlog.id);
			assert.strictEqual(deletedBlog, undefined);
		});

		test("should return 401 when trying to delete another user's blog", async () => {
			const anotherUser = new User({
				username: "anotheruser",
				name: "Another Test User",
				password: await bcrypt.hash("anotherpassword", 10)
			});
			await anotherUser.save();

			const newBlog = {
				title: "Another User's Blog",
				author: "Another Author",
				url: "http://another-user-blog.com",
				likes: 5
			};

			const createResponse = await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${helper.generateToken(anotherUser)}`)
				.send(newBlog)
				.expect(201);

			const createdBlog = createResponse.body;

			await api
				.delete(`/api/blogs/${createdBlog.id}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(401);
		});

		test("should return 401 when no token is provided", async () => {
			const blogsAtStart = await helper.blogsInDb();
			const blogToDelete = blogsAtStart[0];

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.expect(401);
		});
	});

	describe("update an existing data", () => {
		test("should return status code 200 if valid and contains the updated field", async () => {
			const blogsAtStart = await Blog.find({});
			const blogToUpdate = blogsAtStart[0];

			const updateFields = { likes: 10 };

			const response = await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(updateFields)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const updatedBlog = response.body;

			assert.strictEqual(updatedBlog.likes, updateFields.likes);

			assert.strictEqual(updatedBlog.title, blogToUpdate.title);
			assert.strictEqual(updatedBlog.author, blogToUpdate.author);
			assert.strictEqual(updatedBlog.url, blogToUpdate.url);
		});

		test("should update multiple fields of an existing blog", async () => {
			const blogsAtStart = await Blog.find({});
			const blogToUpdate = blogsAtStart[0];

			const updateFields = {
				title: "Updated Blog Title",
				author: "New Author",
				likes: 15,
			};

			const response = await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(updateFields)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const updatedBlog = response.body;

			// Check that updated fields are correct
			assert.strictEqual(updatedBlog.title, updateFields.title);
			assert.strictEqual(updatedBlog.author, updateFields.author);
			assert.strictEqual(updatedBlog.likes, updateFields.likes);

			// Check that unchanged fields remain the same
			assert.strictEqual(updatedBlog.url, blogToUpdate.url);

			// Verify the update in the database
			const blogInDb = await Blog.findById(blogToUpdate.id);
			assert.strictEqual(blogInDb.title, updateFields.title);
			assert.strictEqual(blogInDb.author, updateFields.author);
			assert.strictEqual(blogInDb.likes, updateFields.likes);
			assert.strictEqual(blogInDb.url, blogToUpdate.url);
		});

		test("should return 404 when updating a non-existent blog", async () => {
			const nonExistentId = new mongoose.Types.ObjectId();

			const updateFields = {
				title: "Attempt to Update Non-Existent Blog",
				likes: 5,
			};

			await api
				.put(`/api/blogs/${nonExistentId}`)
				.send(updateFields)
				.expect(404)
				.expect("Content-Type", /application\/json/);
		});
	});
});

after(async () => {
	await mongoose.connection.close();
});
