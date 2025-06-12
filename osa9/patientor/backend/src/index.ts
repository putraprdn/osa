import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoseRoute";
import patientRouter from "./routes/patientRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
	res.json({ pong: "pong" });
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
