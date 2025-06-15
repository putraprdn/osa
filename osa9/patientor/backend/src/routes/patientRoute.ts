import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import {
	NewPatientEntryType,
	NewPatientType,
	PatientType,
	PublicPatientDataType,
} from "../types";
import { NewPatientSchema } from "../utils";
import { z } from "zod";

const patientRouter = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		console.log(req.body);
		NewPatientSchema.parse(req.body);
		console.log(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

patientRouter.get("/", (_req, res: Response<PublicPatientDataType[]>) => {
	return res.send(patientService.getAll());
});

patientRouter.get("/:id", (req, res: Response<PatientType | undefined>) => {
	const { id: patientId } = req.params;
	return res.send(patientService.findById(patientId));
});

patientRouter.post(
	"/",
	newPatientParser,
	(
		req: Request<unknown, unknown, NewPatientType>,
		res: Response<PublicPatientDataType>
	) => {
		const newPatient = patientService.create(req.body);
		res.json(newPatient);
	}
);

patientRouter.post("/:id/entries", (req, res) => {
	const id = req.params.id;
	const newPatientEntry = patientService.createEntry(
		id,
		req.body as NewPatientEntryType
	);
	res.json(newPatientEntry);
});

const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
		console.log(error);
	} else {
		next(error);
	}
};

patientRouter.use(errorMiddleware);

export default patientRouter;
