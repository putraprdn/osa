import { EntryType } from "../../../types";
import HealthCheck from "./HealthCheck";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealthcare";

interface EntryProps {
	entry: EntryType;
}

const PatientEntry = ({ entry }: EntryProps) => {
	console.log("entry", entry);
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};

	switch (entry.type) {
		case "Hospital":
			return <HospitalEntry entry={entry} />;
		case "OccupationalHealthcare":
			return <OccupationalHealthcare entry={entry} />;
		case "HealthCheck":
			return <HealthCheck entry={entry} />;
		default:
			return assertNever(entry);
	}
};

export default PatientEntry;
