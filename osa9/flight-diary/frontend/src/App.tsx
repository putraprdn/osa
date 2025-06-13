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
	const [error, setError] = useState("");

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

	const showError = (msg: string) => {
		setError(msg);

		setTimeout(() => {
			setError("");
		}, 5000);
	};

	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		setNewEntryFields({
			...newEntryFields,
			[e.currentTarget.name]: e.currentTarget.value,
		});
		console.log(newEntryFields);
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		try {
			e.preventDefault();
			const response = await axios.post<DiaryEntry>(
				`${BASE_URL}/api/diaries`,
				newEntryFields
			);
			setDiaries(diaries.concat(response.data));
			setNewEntryFields({
				date: "",
				visibility: Visibility.Good,
				weather: Weather.Stormy,
				comment: "",
			});
			console.log(response.data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				showError(`Failed to add new diary. ${error?.response?.data}`);
				console.log(error);
				return;
			}
			console.log(error);
		}
	};

	return (
		<div>
			<div>
				<h2>Add new entry</h2>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<form onSubmit={handleSubmit}>
					<div>
						date{" "}
						<input
							onChange={handleOnChange}
							value={newEntryFields.date}
							type="date"
							name="date"
						/>
					</div>
					<div>
						visibility{" "}
						<div>
							<label>
								<input
									type="radio"
									name="visibility"
									value={Visibility.Great}
									checked={
										newEntryFields.visibility ===
										Visibility.Great
									}
									onChange={handleOnChange}
								/>
								Great
							</label>

							<label>
								<input
									type="radio"
									name="visibility"
									value={Visibility.Good}
									checked={
										newEntryFields.visibility ===
										Visibility.Good
									}
									onChange={handleOnChange}
								/>
								Good
							</label>

							<label>
								<input
									type="radio"
									name="visibility"
									value={Visibility.Ok}
									checked={
										newEntryFields.visibility ===
										Visibility.Ok
									}
									onChange={handleOnChange}
								/>
								Ok
							</label>

							<label>
								<input
									type="radio"
									name="visibility"
									value={Visibility.Poor}
									checked={
										newEntryFields.visibility ===
										Visibility.Poor
									}
									onChange={handleOnChange}
								/>
								Poor
							</label>
						</div>
					</div>
					<div>
						weather{" "}
						<div>
							<label>
								<input
									type="radio"
									name="weather"
									value={Weather.Sunny}
									checked={
										newEntryFields.weather === Weather.Sunny
									}
									onChange={handleOnChange}
								/>
								Sunny
							</label>

							<label>
								<input
									type="radio"
									name="weather"
									value={Weather.Cloudy}
									checked={
										newEntryFields.weather ===
										Weather.Cloudy
									}
									onChange={handleOnChange}
								/>
								Cloudy
							</label>

							<label>
								<input
									type="radio"
									name="weather"
									value={Weather.Windy}
									checked={
										newEntryFields.weather === Weather.Windy
									}
									onChange={handleOnChange}
								/>
								Windy
							</label>

							<label>
								<input
									type="radio"
									name="weather"
									value={Weather.Rainy}
									checked={
										newEntryFields.weather === Weather.Rainy
									}
									onChange={handleOnChange}
								/>
								Rainy
							</label>

							<label>
								<input
									type="radio"
									name="weather"
									value={Weather.Stormy}
									checked={
										newEntryFields.weather ===
										Weather.Stormy
									}
									onChange={handleOnChange}
								/>
								Stormy
							</label>
						</div>
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
