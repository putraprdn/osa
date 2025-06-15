import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

import axios from "axios";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { apiBaseUrl } from "../constants";
import { Diagnosis, Gender, Patient } from "../types";

const PatientInfo = () => {
	const match = useMatch("/patients/:id");

	const [patient, setPatient] = useState<Patient>();
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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

	useEffect(() => {
		const fetchDiagnoses = async () => {
			const response = await axios.get(`${apiBaseUrl}/diagnoses`);
			setDiagnoses(response.data);
		};
		fetchDiagnoses();
	}, []);

	if (!patient || !Object.values(patient).length)
		return <div>patient not found</div>;

	return (
		<div>
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

			<div>
				<h3>entries</h3>
				{patient &&
					patient.entries.map((e) => (
						<div key={e.id}>
							<p>
								{e.date} {e.description}
							</p>
							{e.diagnosisCodes && (
								<ul>
									{diagnoses.filter(d=>e.diagnosisCodes?.includes(d.code)).map(d => (
										<li key={d.code}>{d.code} {d.name}</li>
									))}
								</ul>
							)}
						</div>
					))}
			</div>
		</div>
	);
};

export default PatientInfo;
