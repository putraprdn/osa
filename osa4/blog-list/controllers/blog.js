const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/", (_, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogRouter.post("/", (request, response) => {
	const body = request.body;

	if (!body?.title || !body?.url) {
		const msg = "title or url is can't be empty";
		logger.error(msg);
		return response.status(400).json({ error: msg });
	}

	body["likes"] = body?.likes ? body.likes : 0;
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

module.exports = blogRouter;
