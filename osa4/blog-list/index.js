const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

mongoose.model("Blog", blogSchema);

const Blog = mongoose.model("Blog", blogSchema);

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

app.use(express.json());

app.get("/api/blogs", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

app.post("/api/blogs", (request, response) => {
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
