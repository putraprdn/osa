const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/", async (_, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
	const body = request.body;

	if (!body?.title || !body?.url) {
		const msg = "title or url is can't be empty";
		logger.error(msg);
		return response.status(400).json({ error: msg });
	}

	body["likes"] = body?.likes ? body.likes : 0;
	const blog = new Blog(request.body);

	const result = await blog.save();
	response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
	const id = request.params.id;

	const deletedBlog = await Blog.findByIdAndDelete(id);
	if (!deletedBlog) response.status(404).json({ error: "blog not found" });

	return response.status(204).end();
});

module.exports = blogRouter;
