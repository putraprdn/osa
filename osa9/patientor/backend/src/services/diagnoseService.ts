import diagnoses from "../data/diagnoses";
import { DiagnosesType } from "../types";

const getAll = (): DiagnosesType[] => {
	return diagnoses;
};

export default {
	getAll,
};
