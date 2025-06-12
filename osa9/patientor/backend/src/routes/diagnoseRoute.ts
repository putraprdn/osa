import express, { Response } from "express";
import { DiagnoseType } from "../types";
import diagnoseService from "../services/diagnoseService";

const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res: Response<DiagnoseType[]>) => {
	res.send(diagnoseService.getAll());
});

export default diagnoseRouter;
