import { z } from "zod";
import { NewPatientSchema } from "./utils";

export enum GenderEnum {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}

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

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnoseType["code"]>;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: {
		date: string;
		criteria: string;
	};
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export type EntryType =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;
export type NewPatientEntryType = UnionOmit<EntryType, "id">;

export type NewPatientType = z.infer<typeof NewPatientSchema>;

export type PublicPatientDataType = Omit<PatientType, "ssn" | "entries">;
