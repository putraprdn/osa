import { z } from "zod";
import { GenderEnum, NewPatientType } from "./types";

export const toNewPatientData = (object: unknown): NewPatientType => {
	return NewPatientSchema.parse(object);
};

export const NewPatientSchema = z.object({
	name: z.string(),
	gender: z.nativeEnum(GenderEnum),
	dateOfBirth: z.string().date(),
	ssn: z.string(),
	occupation: z.string(),
	entries: z.array(z.object({})),
});
