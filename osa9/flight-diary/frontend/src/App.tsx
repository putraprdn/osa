import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";
import type { DiaryEntry } from "./types";

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get<DiaryEntry[]>(`${BASE_URL}/api/diaries`);
			console.log(response.data)
			setDiaries(response.data);
		};
		fetchData();
	}, []);

	return (
		<>
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
		</>
	);
};

export default App;
