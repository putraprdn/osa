require('express-async-errors')
const express = require("express");
const mongoose = require("mongoose");
const { MONGODB_URL } = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blog");

const app = express();

logger.info("connecting to", MONGODB_URL);

mongoose
	.connect(MONGODB_URL)
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error("error connection to MongoDB:", error.message);
	});

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
