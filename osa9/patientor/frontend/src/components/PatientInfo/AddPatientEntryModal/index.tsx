import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import AddPatientEntryForm from "./AddPatientEntryForm";
import { Diagnosis, NewPatientEntryType } from "../../../types";

interface Props {
	modalOpen: boolean;
	diagnoseOptions: Diagnosis[];

	onSubmit: (values: NewPatientEntryType) => void;
	onToggle: () => void;
}

const AddPatientEntryModal = ({
	modalOpen,
	onToggle,
	onSubmit,
	diagnoseOptions,
}: Props) => (
	<Dialog
		fullWidth={true}
		open={modalOpen}
		onClose={() => onToggle()}
	>
		<DialogTitle>Add a new entry</DialogTitle>
		<Divider />
		<DialogContent>
			<AddPatientEntryForm
				diagnoseOptions={diagnoseOptions}
				onSubmit={onSubmit}
				onCancel={() => onToggle()}
			/>
		</DialogContent>
	</Dialog>
);

export default AddPatientEntryModal;
