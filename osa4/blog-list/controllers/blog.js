const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");

blogRouter.get("/", async (_, res) => {
	const blogs = await Blog.find({}).populate("user", {
		name: 1,
		username: 1,
	});
	res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
	const body = req.body;

	if (!body?.title || !body?.url) {
		const msg = "title or url is can't be empty";
		logger.error(msg);
		return res.status(400).json({ error: msg });
	}

	const decodedToken = jwt.verify(req.token, process.env.SECRET_KEY);

	if (!decodedToken.id) {
		return res.status(401).json({ error: "token is invalid" });
	}

	const userData = await User.findById(decodedToken.id);
	body["user"] = userData._id;

	body["likes"] = body?.likes ? body.likes : 0;
	const blog = new Blog(req.body);

	// Save newly created blog with user data
	const savedBlog = await blog.save();

	// Add saved blog to the user data
	userData.blogs = userData.blogs.concat(savedBlog._id);
	await userData.save();

	res.status(201).json(savedBlog);
});

blogRouter.put("/:id", async (req, res) => {
	const id = req.params.id;
	const body = req.body;

	// Only include fields that are present in the req body
	const updateFields = {};
	if (body.title) updateFields.title = body.title;
	if (body.author) updateFields.author = body.author;
	if (body.url) updateFields.url = body.url;
	if (body.likes !== undefined) updateFields.likes = body.likes;

	const updatedBlog = await Blog.findByIdAndUpdate(id, updateFields, {
		new: true,
	});

	if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });

	res.json(updatedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	const token = jwt.verify(req.token, process.env.SECRET_KEY);
	if (!(token && token.id))
		return res.status(401).json({ error: "invalid token" });

	const blogToDelete = await Blog.findById(id);
	if (!blogToDelete) return res.status(404).json({ error: "blog not found" });

	if (blogToDelete.user.toString() !== token.id)
		return res.status(401).json({ error: "unauthorized access" });

	await Blog.findByIdAndDelete(blogToDelete._id);

	return res.status(204).end();
});

module.exports = blogRouter;
