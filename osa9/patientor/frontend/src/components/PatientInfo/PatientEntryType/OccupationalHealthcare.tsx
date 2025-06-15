import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

import { OccupationalHealthcareEntry } from "../../../types";

interface OccupationalHealthcareProps {
	entry: OccupationalHealthcareEntry;
}
const OccupationalHealthcare = ({ entry }: OccupationalHealthcareProps) => {
	return (
		<div className="spacer wrapper">
			<p>
				{entry.date} <MedicalInformationIcon />
			</p>
			<p>{entry.description}</p>
			<p>{entry.specialist}</p>
		</div>
	);
};

export default OccupationalHealthcare;
