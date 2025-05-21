const jwt = require("jsonwebtoken");
const User = require("../models/user");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });

	const isPasswordCorrect =
		user && (await bcrypt.compare(password, user.password));

	if (!isPasswordCorrect)
		res.status(401).json({ error: "invalid username or password" });

	const userData = {
		username,
		id: user._id,
	};

	const token = jwt.sign(userData, process.env.SECRET_KEY, {
		expiresIn: 60 * 60,
	});

	res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
