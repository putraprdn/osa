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

describe("favorite blog", () => {
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
			likes: 5,
			id: "682aba8ed50a968c1fbc9706",
		},
		{
			title: "Tes Blog 2",
			author: "dudung",
			url: "https://ehhehee.cpm",
			likes: 58,
			id: "682aba8ed50a968c1fbc9706",
		},
	];

	test("of empty list should return null", () => {
		const emptyBlogs = [];

		assert.deepStrictEqual(listHelper.favoriteBlog(emptyBlogs), null);
	});

	test("of a single blog list should return the only data", () => {
		const singleBlog = [blogs[1]];

		assert.deepStrictEqual(listHelper.favoriteBlog(singleBlog), blogs[1]);
	});

	test("of a blog lists is calculated right", () => {
		const result = blogs[2];

		assert.deepStrictEqual(listHelper.favoriteBlog(blogs), result);
	});
});

describe("most blogs", () => {
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
		{
			title: "Another Blog",
			author: "robert",
			url: "https://example.com",
			likes: 5,
			id: "782aba8ed50a968c1fbc9707",
		},
		{
			title: "Third Blog",
			author: "robert",
			url: "https://example.com",
			likes: 3,
			id: "882aba8ed50a968c1fbc9708",
		},
	];

	test("of empty list should return null", () => {
		const emptyBlogs = [];

		assert.deepStrictEqual(listHelper.mostBlogs(emptyBlogs), null);
	});

	test("of a single blog list should return that author", () => {
		const singleBlogList = [blogs[0]];

		assert.deepStrictEqual(listHelper.mostBlogs(singleBlogList), {
			author: "dudung",
			blogs: 1,
		});
	});

	test("of a blog list with multiple authors", () => {
		assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
			author: "dudung",
			blogs: 2,
		});
	});
});
