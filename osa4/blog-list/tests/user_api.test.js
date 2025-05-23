const assert = require("node:assert");
const { describe, test, after, beforeEach } = require("node:test");
const User = require("../models/user");
const helper = require("./test_helper");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const logger = require("../utils/logger");
const mongoose = require("mongoose");

const api = supertest(app);

describe("user api", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const hashedUsers = await Promise.all(
			helper.initialUsers.map(async (user) => ({
				...user,
				password: await bcrypt.hash(user.password, 10),
			}))
		);
		await User.insertMany(hashedUsers);
	});

	test("should return all users with status 200 and correct document length", async () => {
		await api
			.get("/api/users")
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const totalUsers = await User.countDocuments();
		assert.strictEqual(totalUsers, (await helper.usersInDb()).length);
	});

	describe("users creation", () => {
		const userFields = {
			name: "Test User Create",
			username: "test create user",
			password: "secret",
		};
		test("should return created user with status 201 if request is valid", async () => {
			const totalUsersBeforeStart = (await helper.usersInDb()).length;

			await api
				.post("/api/users")
				.send(userFields)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const totalUsersAfterStart = (await helper.usersInDb()).length;

			assert.strictEqual(totalUsersAfterStart, totalUsersBeforeStart + 1);
		});

		test("should fail if username is duplicated or too short with status 400", async () => {
			const existingUser = await User.find({});
			const duplicateUsername = {
				...userFields,
				username: existingUser.username,
			};

			await api
				.post("/api/users")
				.send(duplicateUsername)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			const usernameTooShort = "ex";
			await api
				.post("/api/users")
				.send({ ...duplicateUsername, username: usernameTooShort })
				.expect(400)
				.expect("Content-Type", /application\/json/);
		});

		test("should fail if password is too short with status 400", async () => {
			const passwordTooShort = {
				...userFields,
				password: "12",
			};

			await api
				.post("/api/users")
				.send(passwordTooShort)
				.expect(400)
				.expect("Content-Type", /application\/json/);
		});
	});
});

after(async () => {
	await mongoose.connection.close();
});
