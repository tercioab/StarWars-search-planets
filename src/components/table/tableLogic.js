import React, { useContext } from "react";
import myContext from "../../context/context";

function TableLogic() {
	const { planetsApi, states } = useContext(myContext);
	const { planetFilterByName, groupOfValues, groupSortedOptions } = states;

	const tablesValues = [
		"Name",
		"Rotation",
		"Orbital",
		"Diameter",
		"Climate",
		"Gravity",
		"Terrain",
		"SurfaceWater",
		"Population",
	];

	const filterHandleName = planets =>
		planets.name.toUpperCase().match(planetFilterByName.planetName?.toUpperCase());

	const removeUnknown = a => {
		const { column, sort } = groupSortedOptions;
		return sort && !Number.isNaN(+a[column]) ? +"-1" : 0;
	};

	const listTables = values => values.map(planets => <th key={planets}>{planets}</th>);

	const sortedColumnValues = (a, b) => {
		const { column, sort } = groupSortedOptions;
		const DESC = a[column] - b[column];
		const ASC = b[column] - a[column];
		if (sort === "ASC") {
			return ASC;
		}
		if (sort === "DESC") {
			return DESC;
		}
		if (sort === "") return planetsApi;
	};

	const filterValueGroup = planets => {
		const boolsResult = [];
		groupOfValues.forEach(({ comparison, column, value }) => {
			if (comparison === "maior que") {
				boolsResult.push(Number(planets[column]) > Number(value));
			}
			if (comparison === "menor que") {
				boolsResult.push(Number(planets[column]) < Number(value));
			}
			if (comparison === "igual a") {
				boolsResult.push(Number(planets[column]) === Number(value));
			}
		});

		return boolsResult.every(el => el);
	};

	return (
		<div>
			<div className='container'>
				<div className='gallery-wrapper'>
					<div className='gallery'>
						<div>
							<table  className="item current-item" >
								<thead>
								<tr>{listTables(tablesValues)}</tr>
								</thead>
								<tbody>
									{planetsApi
										.filter(filterHandleName)
										.filter(filterValueGroup)
										.sort(sortedColumnValues)
										.sort(removeUnknown)
										.map(
											({
												name,
												rotation_period: rotationPeriod,
												orbital_period: orbitalPeriod,
												diameter,
												climate,
												gravity,
												terrain,
												surface_water: surfaceWater,
												population,
											}) => (
												<tr key={name}>
													<td data-testid='planet-name'>{name}</td>
													<td>{rotationPeriod}</td>
													<td>{orbitalPeriod}</td>
													<td>{diameter}</td>
													<td>{climate}</td>
													<td>{gravity}</td>
													<td>{terrain}</td>
													<td>{surfaceWater}</td>
													<td>{population}</td>
												</tr>
											),
										)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TableLogic;
