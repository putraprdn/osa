const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (_, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogRouter.post("/", (request, response) => {
	const body = request.body;
	body["likes"] = body?.likes ? body.likes : 0;
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

module.exports = blogRouter;
