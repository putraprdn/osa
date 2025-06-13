import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";
import {
	type NewDiaryEntry,
	Visibility,
	Weather,
	type DiaryEntry,
} from "./types";

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
	const [newEntryFields, setNewEntryFields] = useState<NewDiaryEntry>({
		date: "",
		visibility: Visibility.Good,
		weather: Weather.Stormy,
		comment: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get<DiaryEntry[]>(
				`${BASE_URL}/api/diaries`
			);
			console.log(response.data);
			setDiaries(response.data);
		};
		fetchData();
	}, []);

	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		setNewEntryFields({
			...newEntryFields,
			[e.currentTarget.name]: e.currentTarget.value,
		});
		console.log(newEntryFields);
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const response = await axios.post<DiaryEntry>(
			`${BASE_URL}/api/diaries`,
			newEntryFields
		);
		setDiaries(diaries.concat(response.data));
		console.log(response.data);
	};

	return (
		<div>
			<div>
				<h2>Add new entry</h2>
				<form onSubmit={handleSubmit}>
					<div>
						date{" "}
						<input
							onChange={handleOnChange}
							value={newEntryFields.date}
							type="text"
							name="date"
						/>
					</div>
					<div>
						visibility{" "}
						<input
							onChange={handleOnChange}
							value={newEntryFields.visibility}
							type="text"
							name="visibility"
						/>
					</div>
					<div>
						weather{" "}
						<input
							onChange={handleOnChange}
							value={newEntryFields.weather}
							type="text"
							name="weather"
						/>
					</div>
					<div>
						comment{" "}
						<input
							onChange={handleOnChange}
							value={newEntryFields.comment}
							type="text"
							name="comment"
						/>
					</div>
					<button>add</button>
				</form>
			</div>

			<h1>Diary Entries</h1>
			<div>
				{diaries &&
					diaries.map((d) => (
						<div key={d.id}>
							<p>
								<strong>{d.date}</strong>
							</p>
							<div>visibility: {d.visibility}</div>
							<div>weather: {d.weather}</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default App;
