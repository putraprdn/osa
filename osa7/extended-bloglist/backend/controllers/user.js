const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");

userRouter.get("/", async (_, res) => {
	const result = await User.find({}).populate("blogs", {
		url: 1,
		title: 1,
		author: 1,
	});
	res.status(200).json(result);
});

userRouter.post("/", async (req, res) => {
	const { username, name, password } = req.body;

	if (password.length < 3) {
		logger.error(password, "password is too short");
		return res
			.status(400)
			.json({ error: "password is minimum 3 characters long" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	logger.info(hashedPassword);

	const result = await User.create({
		username,
		name,
		password: hashedPassword,
	});
	res.status(201).json(result);
});

module.exports = userRouter;
