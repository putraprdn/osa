import express, { Response } from "express";
import { DiagnosesType } from "../types";
import diagnoseService from "../services/diagnoseService";

const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res: Response<DiagnosesType[]>) => {
	res.send(diagnoseService.getAll());
});

export default diagnoseRouter;
