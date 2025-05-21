const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const initialBlogs = [
	{
		title: "Tes Blog",
		author: "dudung",
		url: "https://ehhehee.cpm",
		likes: 2,
	},
	{
		title: "Tes Blog 2",
		author: "dudung",
		url: "https://ehhehee.cpm",
		likes: 5,
	},
	{
		title: "Tes Blog 3",
		author: "dudung",
		url: "https://ehhehee.cpm",
		likes: 58,
	},
];

const initialUsers = [
	{
		username: "test 1",
		name: "Test User 1",
		password: "secret",
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

const generateToken = (user) => {
	const userForToken = {
		username: user.username,
		id: user._id,
	};
	return jwt.sign(userForToken, process.env.SECRET_KEY);
};

module.exports = {
	blogsInDb,
	initialBlogs,
	initialUsers,
	usersInDb,
	generateToken,
};
