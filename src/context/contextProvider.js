import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import myContext from "./context";

function MyContextProvider({ children }) {
	const endPoint = "https://swapi.dev/api/planets";

	const [planetsListApi, setPlanetsOnApi] = useState([]);
	const [groupOfValues, setGroupOfValues] = useState([]);
	const [groupSortedOptions, setGroupSortedOptions] = useState({});
	const [planetFilterByName, setFilterByName] = useState("");
	const [filterValues, setFilterValues] = useState({
		value: 0,
		column: "population",
		comparison: "maior que",
	});

	const [optionsOfcolumn, setOptionscolumn] = useState([
		"population",
		"orbital_period",
		"diameter",
		"rotation_period",
		"surface_water",
	]);

	const [sortedOptions, setSortedOptions] = useState({
		column: "population",
		sort: "",
	});

	 const [loading, setLoading] = useState(false)

	const [disableButton, setDisableButton] = useState(false);

	useEffect(() => {
		const getPlanetsApi = async () => {
			setLoading(true)
			const response = await fetch(endPoint);
			const { results } = await response.json();
			const planets = await results.map(planetas => {
				delete planetas.residents;
				return planetas;
			});
			setPlanetsOnApi(planets);
			setLoading(false)
		};
		getPlanetsApi();
	}, [setPlanetsOnApi]);


	useEffect(() => {
		setFilterValues({
			value: 0,
			column: optionsOfcolumn[0],
			comparison: "maior que",
		});
	}, [optionsOfcolumn]);


	useEffect(() => {
		if (optionsOfcolumn.length === 0) {
      setDisableButton(true);
      alert("ALL FILTERS HAVE BEEN USED")
		} else {
			setDisableButton(false);
    }
	}, [optionsOfcolumn]);

	const preventForm = e => {
		e.preventDefault();
	};


	const planetsValues = {
		planetsApi: planetsListApi,
		states: {
			filterValues,
			optionsOfcolumn,
			sortedOptions,
			groupOfValues,
			disableButton,
			planetFilterByName,
			groupSortedOptions,
			loading,
		},
		setStates: {
			setDisableButton,
			setOptionscolumn,
			setGroupOfValues,
			setFilterValues,
			setFilterByName,
			setSortedOptions,
			setGroupSortedOptions,
		},
		functions: {
			preventForm,
		},
	};
	return <myContext.Provider value={planetsValues}>{children}</myContext.Provider>;
}

MyContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export default MyContextProvider;
