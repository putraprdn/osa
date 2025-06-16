import { useState, SyntheticEvent, useEffect } from "react";

import {
	TextField,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Button,
	SelectChangeEvent,
	Input,
} from "@mui/material";

import ReactSelect, { ActionMeta } from "react-select";

import {
	Diagnosis,
	HealthCheckRating,
	NewPatientEntryType,
} from "../../../types";

interface Props {
	diagnoseOptions: Diagnosis[];
	onCancel: () => void;
	onSubmit: (values: NewPatientEntryType) => void;
}

enum PatientEntryTypes {
	OccupationalHealthcare = "OccupationalHealthcare",
	Hospital = "Hospital",
	HealthCheck = "HealthCheck",
}

interface PatientEntryTypeOption {
	value: PatientEntryTypes;
	label: string;
}

interface DiagnoseCodeOption {
	value: string;
	label: string;
}
const AddPatientEntryForm = ({
	onCancel,
	onSubmit,
	diagnoseOptions,
}: Props) => {
	const [date, setDate] = useState("");
	const [type, setType] = useState<PatientEntryTypes>(
		PatientEntryTypes.HealthCheck
	);
	const [specialist, setSpecialist] = useState("");
	const [description, setDescription] = useState("");
	const [diagnoseCode, setDiagnoseCode] = useState<string[]>([]);

	// HealthCheck-specific field
	const [healthCheckRating, setHealthCheckRating] =
		useState<HealthCheckRating>(HealthCheckRating.Healthy);

	// Hospital-specific fields
	const [dischargeDate, setDischargeDate] = useState("");
	const [dischargeCriteria, setDischargeCriteria] = useState("");

	// OccupationalHealthcare-specific fields
	const [employerName, setEmployerName] = useState("");
	const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
	const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

	const [diagnoseCodeOptions, setDiagnoseCodeOptions] = useState<
		DiagnoseCodeOption[]
	>([]);

	const PatientEntryTypeOptions: PatientEntryTypeOption[] = Object.values(
		PatientEntryTypes
	).map((v) => ({
		value: v,
		label: v.toString(),
	}));

	useEffect(() => {
		const parse = () => {
			const parsedOptions: DiagnoseCodeOption[] = diagnoseOptions.map(
				(d) => {
					return {
						value: d.code,
						label: `${d.code} - ${d.name}`,
					};
				}
			);

			setDiagnoseCodeOptions(parsedOptions);
		};
		parse();
	}, []);

	const onTypeChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		if (typeof event.target.value === "string") {
			const value = event.target.value;
			const type = Object.values(PatientEntryTypes).find(
				(t) => t.toString() === value
			);
			if (type) {
				setType(type);
			}
		}
	};

	const onDiagnoseCodeChange = (
		selectedOptions: readonly DiagnoseCodeOption[],
		_actionMeta: ActionMeta<DiagnoseCodeOption>
	) => {
		console.log(selectedOptions);
		const newSelectedOptions: string[] = selectedOptions.map(
			(o) => o.value
		);
		setDiagnoseCode(newSelectedOptions);
	};

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();

		let toSubmitFields: NewPatientEntryType;

		switch (type) {
			case PatientEntryTypes.HealthCheck:
				toSubmitFields = {
					type: "HealthCheck",
					date,
					description,
					specialist,
					diagnosisCodes:
						diagnoseCode.length > 0 ? diagnoseCode : undefined,
					healthCheckRating,
				};
				break;

			case PatientEntryTypes.Hospital:
				toSubmitFields = {
					type: "Hospital",
					date,
					description,
					specialist,
					diagnosisCodes:
						diagnoseCode.length > 0 ? diagnoseCode : undefined,
					discharge:
						dischargeDate && dischargeCriteria
							? {
									date: dischargeDate,
									criteria: dischargeCriteria,
							  }
							: undefined,
				};
				break;

			case PatientEntryTypes.OccupationalHealthcare:
				toSubmitFields = {
					type: "OccupationalHealthcare",
					date,
					description,
					specialist,
					diagnosisCodes:
						diagnoseCode.length > 0 ? diagnoseCode : undefined,
					employerName,
					sickLeave:
						sickLeaveStartDate && sickLeaveEndDate
							? {
									startDate: sickLeaveStartDate,
									endDate: sickLeaveEndDate,
							  }
							: undefined,
				};
				break;

			default:
				throw new Error("Invalid entry type");
		}

		console.log(toSubmitFields);
		onSubmit(toSubmitFields);
	};

	return (
		<div>
			<form onSubmit={addEntry}>
				<InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
				<Input
					name="date"
					placeholder="YYYY-MM-DD"
					fullWidth
					value={date}
					type={"date"}
					onChange={({ target }) => setDate(target.value)}
				/>
				<InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
				<Select
					label="Type"
					fullWidth
					value={type}
					onChange={onTypeChange}
				>
					{PatientEntryTypeOptions.map((option) => (
						<MenuItem
							key={option.label}
							value={option.value}
						>
							{option.label}
						</MenuItem>
					))}
				</Select>

				<TextField
					label="Specialist"
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>

				<InputLabel style={{ marginTop: 20 }}>Diagnose Code</InputLabel>
				<ReactSelect
					isMulti
					value={diagnoseCodeOptions.filter((option) =>
						diagnoseCode.includes(option.value)
					)}
					onChange={onDiagnoseCodeChange}
					options={diagnoseCodeOptions}
					styles={{
						container: (base) => ({ ...base, width: "100%" }),
					}}
				/>

				<TextField
					label="Description"
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>

				{/* Conditional Fields Based on Type */}
				{type === PatientEntryTypes.HealthCheck && (
					<>
						<InputLabel style={{ marginTop: 20 }}>
							Health Check Rating
						</InputLabel>
						<Select
							label="Health Check Rating"
							fullWidth
							value={healthCheckRating}
							onChange={(e) =>
								setHealthCheckRating(
									Number(e.target.value) as HealthCheckRating
								)
							}
						>
							{Object.entries(HealthCheckRating)
								.filter(([key]) => isNaN(Number(key)))
								.map(([key, value]) => (
									<MenuItem
										key={key}
										value={value}
									>
										{key}
									</MenuItem>
								))}
						</Select>
					</>
				)}

				{type === PatientEntryTypes.Hospital && (
					<>
						<TextField
							label="Discharge Date"
							placeholder="YYYY-MM-DD"
							fullWidth
							value={dischargeDate}
							onChange={({ target }) =>
								setDischargeDate(target.value)
							}
							style={{ marginTop: 20 }}
						/>
						<TextField
							label="Discharge Criteria"
							fullWidth
							value={dischargeCriteria}
							onChange={({ target }) =>
								setDischargeCriteria(target.value)
							}
							style={{ marginTop: 20 }}
						/>
					</>
				)}

				{type === PatientEntryTypes.OccupationalHealthcare && (
					<>
						<TextField
							label="Employer Name"
							fullWidth
							value={employerName}
							onChange={({ target }) =>
								setEmployerName(target.value)
							}
							style={{ marginTop: 20 }}
						/>
						<TextField
							label="Sick Leave Start Date"
							placeholder="YYYY-MM-DD"
							fullWidth
							value={sickLeaveStartDate}
							onChange={({ target }) =>
								setSickLeaveStartDate(target.value)
							}
							style={{ marginTop: 20 }}
						/>
						<TextField
							label="Sick Leave End Date"
							placeholder="YYYY-MM-DD"
							fullWidth
							value={sickLeaveEndDate}
							onChange={({ target }) =>
								setSickLeaveEndDate(target.value)
							}
							style={{ marginTop: 20 }}
						/>
					</>
				)}

				<Grid>
					<Grid item>
						<Button
							color="secondary"
							variant="contained"
							style={{ float: "left" }}
							type="button"
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{ float: "right" }}
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default AddPatientEntryForm;
