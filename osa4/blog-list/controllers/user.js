const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");

userRouter.get("/", async (_, res) => {
	const result = await User.find({});
	res.status(200).json(result);
});

userRouter.post("/", async (req, res) => {
	const { username, name, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);
	logger.info(hashedPassword);

	const result = await User.create({ username, name, password: hashedPassword });
	res.status(201).json(result);
});

module.exports = userRouter;
