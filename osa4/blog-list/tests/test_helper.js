const Blog = require("../models/blog");

const initialBlogs = [
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

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = {
	blogsInDb,
	initialBlogs,
};
