import {

	styled,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,

} from "@mui/material";
import React, { useContext } from "react";
import myContext from "../../context/context";
import Paper from "@mui/material/Paper";

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
		"Films",
		"Created",
		"Edited",
		"Url",
	];

	const filterHandleName = planets =>
		planets.name.toUpperCase().match(planetFilterByName.planetName?.toUpperCase());

	const removeUnknown = a => {
		const { column, sort } = groupSortedOptions;
		return sort && !Number.isNaN(+a[column]) ? +"-1" : 0;
	};

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));

	const listTables = values =>
		values.map(planets => <StyledTableCell key={planets}>{planets}</StyledTableCell>);

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
		<Paper
			sx={{ width: "96%", overflow: "hidden", marginLeft: "auto", marginRight: "auto" }}
		>
			<TableContainer component={Paper} className='table-values'>
				<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
					<TableHead>
						<TableRow>{listTables(tablesValues)}</TableRow>
					</TableHead>
					<TableBody>
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
									films,
									created,
									edited,
									url,
								}) => (
									<TableRow key={name}>
										<TableCell data-testid='planet-name'>{name}</TableCell>
										<TableCell>{rotationPeriod}</TableCell>
										<TableCell>{orbitalPeriod}</TableCell>
										<TableCell>{diameter}</TableCell>
										<TableCell>{climate}</TableCell>
										<TableCell>{gravity}</TableCell>
										<TableCell>{terrain}</TableCell>
										<TableCell>{surfaceWater}</TableCell>
										<TableCell>{population}</TableCell>
										<TableCell>{films}</TableCell>
										<TableCell>{created}</TableCell>
										<TableCell>{edited}</TableCell>
										<TableCell>{url}</TableCell>
									</TableRow>
								),
							)}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}

export default TableLogic;
