import diagnoses from "../data/diagnoses";
import { DiagnoseType } from "../types";

const getAll = (): DiagnoseType[] => {
	return diagnoses;
};

export default {
	getAll,
};
