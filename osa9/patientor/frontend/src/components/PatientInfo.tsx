import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

import axios from "axios";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { apiBaseUrl } from "../constants";
import { Gender, Patient } from "../types";

const PatientInfo = () => {
	const match = useMatch("/patients/:id");
	const [patient, setPatient] = useState<Patient>();

	useEffect(() => {
		const fetch = async () => {
			const response = await axios.get<Patient>(
				`${apiBaseUrl}/patients/${match?.params.id}`
			);
			console.log(response.data);
			setPatient(response.data);
		};

		fetch();
	}, [match?.params.id]);

	if (!patient || !Object.values(patient).length)
		return <div>patient not found</div>;

	return (
		<div>
			<h2>
				{patient?.name}{" "}
				<span>
					{patient.gender === Gender.Female ? (
						<FemaleIcon />
					) : (
						<MaleIcon />
					)}
				</span>
			</h2>

			<div>ssn: {patient.ssn}</div>
			<div>occupation: {patient.occupation}</div>
		</div>
	);
};

export default PatientInfo;
