import express, { Response } from "express";
import patientService from "../services/patientService";
import { PublicPatientDataType } from "../types";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res: Response<PublicPatientDataType[]>) => {
	return res.send(patientService.getAll());
});

export default patientRouter;
