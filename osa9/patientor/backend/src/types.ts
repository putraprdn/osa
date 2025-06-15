import { z } from "zod";
import { NewPatientSchema } from "./utils";

export enum GenderEnum {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EntryType {}
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
	entries: EntryType[];
}

export type NewPatientType = z.infer<typeof NewPatientSchema>;

export type PublicPatientDataType = Omit<PatientType, "ssn" | "entries">;
