import express, { Response } from "express";
import patientService from "../services/patientService";
import { PublicPatientDataType } from "../types";
import { toNewPatientData } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res: Response<PublicPatientDataType[]>) => {
	return res.send(patientService.getAll());
});

patientRouter.post("/", (req, res) => {
	try {
		const parsedData = toNewPatientData(req.body);
		const newPatient = patientService.create(parsedData);
		res.send(newPatient);
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.sendStatus(400);
			console.log(error.message);
		}
	}
});

export default patientRouter;
