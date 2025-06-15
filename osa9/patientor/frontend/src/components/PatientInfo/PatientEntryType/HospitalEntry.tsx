import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { HospitalEntry as HospitalEntryType } from "../../../types";

interface HospitalEntryProps {
	entry: HospitalEntryType;
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
	return (
		<div className="wrapper spacer">
			<p>
				{entry.date} <LocalHospitalIcon />
			</p>
			<p>{entry.description}</p>
			<p>{entry.specialist}</p>
		</div>
	);
};

export default HospitalEntry;
