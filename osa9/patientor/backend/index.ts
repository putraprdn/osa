import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
	res.json({ pong: "pong" });
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
