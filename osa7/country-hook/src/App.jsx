import React, { useState, useEffect } from "react";
import axios from "axios";

const baseAPI = "https://studies.cs.helsinki.fi/restcountries/api";

const useField = (type) => {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
	};

	return {
		type,
		value,
		onChange,
	};
};

const useCountry = (name) => {
	const [country, setCountry] = useState({ country: {}, found: null });

	useEffect(() => {
		const fetchCountryByName = async () => {
			try {
				if (!name) {
					setCountry({ country: {}, found: null });
					return;
				}

				const response = await axios.get(`${baseAPI}/name/${name}`);
				setCountry({ countries: response.data, found: true });

				console.log(name, response.data);
				return response.data;
			} catch (error) {
				if (error.status === 404) {
					setCountry({ country: {}, found: false });
					console.log("error not found");
				}
			}
		};
		fetchCountryByName();
	}, [name]);

	return country;
};

const Country = ({ country, found }) => {
	if (!country && found === null) {
		return null;
	}

	if (found === false) {
		console.log("not found");
		return <div>not found...</div>;
	}

	return (
		<div>
			<h3>{country.name.common} </h3>
			<div>capital {country.capital} </div>
			<div>population {country.population}</div>
			<img
				src={country.flags.png}
				height="100"
				alt={country.flags.alt}
			/>
		</div>
	);
};

const App = () => {
	const nameInput = useField("text");
	const [name, setName] = useState("");
	const country = useCountry(name);

	console.log("hehehe", country);

	const fetch = async (e) => {
		e.preventDefault();
		const countryToSearch = nameInput.value;
		setName(countryToSearch);
	};

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country
				country={country.countries}
				found={country.found}
			/>
		</div>
	);
};

export default App;
