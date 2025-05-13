import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
	const [search, setSearch] = useState("");
	const [countries, setCountries] = useState([]);
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((res) => setCountries(res.data))
			.catch(console.error);
	}, []);
  
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearch(value);

		const cleanArr = value.trim()
			? countries.filter((c) =>
					c.name.common.toLowerCase().includes(value.toLowerCase())
			  )
			: [];

		setFiltered(cleanArr);
	};

	const handleClick = (name) => {
		const getCountry = countries.find((country) => {
			return country.name.official === name;
		});
		setFiltered([getCountry]);
		return;
	};

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
						<div key={c.name.official}>
							{c.name.common}{" "}
							<button
								onClick={() => {
									handleClick(c.name.official);
								}}
							>
								Show
							</button>
						</div>
					))}
				</>
			)}
		</>
	);
};

export default App;
