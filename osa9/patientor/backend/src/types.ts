import { z } from "zod";
import { NewPatientSchema } from "./utils";

export interface DiagnoseType {
	code: string;
	name: string;
	latin?: string;
}

export interface PatientType {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export type NewPatientType = z.infer<typeof NewPatientSchema>;

export type PublicPatientDataType = Omit<PatientType, "ssn">;

export enum GenderEnum {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}
