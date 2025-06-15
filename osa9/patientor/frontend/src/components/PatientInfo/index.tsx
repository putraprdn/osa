import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

import axios from "axios";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { apiBaseUrl } from "../../constants";
import { Gender, Patient, Diagnosis, NewPatientEntryType } from "../../types";
import PatientEntry from "./PatientEntryType";
import { Button } from "@mui/material";
import AddPatientEntryModal from "./AddPatientEntryModal";

const PatientInfo = () => {
	const match = useMatch("/patients/:id");

	const [patient, setPatient] = useState<Patient>();
	const [toggleModal, setToggleModal] = useState<boolean>(false);

	const [diagnoseCodeOptions, setDiagnoseCodeOptions] = useState<Diagnosis[]>(
		[]
	);

	useEffect(() => {
		const fetchPatient = async () => {
			try {
				const [patientResponse, diagnosesResponse] = await Promise.all([
					axios.get<Patient>(
						`${apiBaseUrl}/patients/${match?.params.id}`
					),
					axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`),
				]);

				setPatient(patientResponse.data);
				setDiagnoseCodeOptions(diagnosesResponse.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchPatient();
	}, [match?.params.id]);

	const handleOnSubmit = async (newEntry: NewPatientEntryType) => {
		try {
			console.log('called')
			const response = await axios.post<Patient>(
				`${apiBaseUrl}/patients/${match?.params.id}/entries`,
				newEntry
			);
			if (!response?.data) throw new Error("failed to create new entry");
			// Update patient's entries
			setPatient(response.data);

			console.log("Updated patient:", patient);
		} catch (error) {
			console.log(error);
		}
	};

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
						<PatientEntry
							key={e.id}
							entry={e}
						/>
					))}
			</div>

			<AddPatientEntryModal
				diagnoseOptions={diagnoseCodeOptions}
				modalOpen={toggleModal}
				onToggle={() => setToggleModal(!toggleModal)}
				onSubmit={handleOnSubmit}
			/>

			<Button
				onClick={() => setToggleModal(true)}
				style={{ marginTop: 20 }}
				variant="contained"
				color="primary"
			>
				Add entry
			</Button>
		</div>
	);
};

export default PatientInfo;
