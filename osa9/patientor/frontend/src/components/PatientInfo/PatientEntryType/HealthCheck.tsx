import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import WarningIcon from "@mui/icons-material/Warning";
import DangerousIcon from "@mui/icons-material/Dangerous";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { HealthCheckEntry, HealthCheckRating } from "../../../types";

interface HealthCheckProps {
	entry: HealthCheckEntry;
}
const HealthCheck = ({ entry }: HealthCheckProps) => {
	const healthCheckParse = (
		health: HealthCheckRating
	): React.ReactElement => {
		if (
			health === HealthCheckRating.Healthy ||
			health === HealthCheckRating.LowRisk
		)
			return <ThumbUpAltIcon style={{ color: "green" }} />;
		else if (health === HealthCheckRating.HighRisk)
			return <WarningIcon style={{ color: "yellow" }} />;
		else if (health === HealthCheckRating.CriticalRisk)
			return <DangerousIcon style={{ color: "red" }} />;
		else return <QuestionMarkIcon />;
	};

	return (
		<div className="wrapper spacer">
			<p>
				{entry.date} <TaskAltIcon />
			</p>
			<p>{entry.description}</p>
			<p>{healthCheckParse(entry.healthCheckRating)}</p>
			<p>{entry.specialist}</p>
		</div>
	);
};

export default HealthCheck;
