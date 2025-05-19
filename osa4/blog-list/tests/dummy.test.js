const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy return one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	assert.strictEqual(result, 1);
});

describe("total likes", () => {
	test("of empty list is zero", () => {
		assert.strictEqual(listHelper.totalLikes([]), 0);
	});

	test("when list has only one blog equals the likes of that", () => {
		const singleBlog = {
			title: "Tes Blog 2",
			author: "dudung",
			url: "https://ehhehee.cpm",
			likes: 6,
			id: "682aba8ed50a968c1fbc9706",
		};

		assert.strictEqual(
			listHelper.totalLikes([singleBlog]),
			singleBlog.likes
		);
	});

	test("of a bigger list is calculated right", () => {
		const blogs = [
			{
				title: "Tes Blog",
				author: "dudung",
				url: "https://ehhehee.cpm",
				likes: 2,
				id: "682ab8397263fdebb6241254",
			},
			{
				title: "Tes Blog 2",
				author: "dudung",
				url: "https://ehhehee.cpm",
				likes: 2,
				id: "682aba8ed50a968c1fbc9706",
			},
		];

		const likes = listHelper.totalLikes(blogs);

		assert.strictEqual(likes, 4);
	});
});
