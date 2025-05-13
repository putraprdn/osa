import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
	const [search, setSearch] = useState("");
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((res) => setCountries(res.data))
			.catch(console.error);
	}, []);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	const filtered = search.trim()
		? countries.filter((c) =>
				c.name.common.toLowerCase().includes(search.toLowerCase())
		  )
		: [];

	return (
		<>
			<div>
				find countries{" "}
				<input
					value={search}
					onChange={handleSearchChange}
					type="text"
				/>
			</div>

			{search.trim() && filtered.length > 10 && (
				<p>Too many matches, specify another filter</p>
			)}

			{filtered.length === 1 && (
				<div key={filtered[0].name.official}>
					<h1>{filtered[0].name.common}</h1>
					<div>Capital {filtered[0].capital[0]}</div>
					<div>Area {filtered[0].area}</div>

					<h2>Languages</h2>
					<ul>
						{Object.values(filtered[0].languages).map((lang) => (
							<li key={lang}>{lang}</li>
						))}
					</ul>

					<img
						src={filtered[0].flags.png}
						alt={filtered[0].flags.alt}
					/>
				</div>
			)}

			{filtered.length <= 10 && filtered.length > 1 && (
				<>
					{filtered.map((c) => (
						<div key={c.name.official}>{c.name.common}</div>
					))}
				</>
			)}
		</>
	);
};

export default App;
