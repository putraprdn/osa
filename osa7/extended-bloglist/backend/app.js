require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const { MONGODB_URL } = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

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
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

// Reset DB for testing
if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/testing");
	app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
