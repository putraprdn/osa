import express from "express";

const app = express();

app.get("/hello", (_req, res) => {
	res.end("<h1>Hello Full Stack!</h1>");
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server is up and running on port http://localhost:${PORT}`);
});
