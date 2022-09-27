import { Button } from "@mui/material";
import React, { useContext } from "react";
import myContext from "../../context/context";
import DeleteIcon from "@mui/icons-material/Delete";

function FilterSelecteds() {
	const { states, setStates } = useContext(myContext);
	const { groupOfValues, disableButton } = states;
	const { setOptionscolumn, setGroupOfValues } = setStates;

	const clearOneFilter = column => {
		const unusedOptions = groupOfValues.filter(
			valuesFilter => valuesFilter.column !== column,
		);
		setGroupOfValues(unusedOptions);
		setOptionscolumn(prev => [...prev, column]);
	};

	return (
		<div className='selectedFilters'>
			{disableButton &&
				<p className="selectedAlert">TODOS OS FILTROS JÁ FORAM UTILIZADOS</p>
			}
			{groupOfValues.length > 0 && <p className="selectedP">FILTROS UTILIZADOS</p>}

			{groupOfValues.map(({ value, column, comparison }, i) => (
				
					<span className="filterSelected" data-testid='filter'>
						{value} {column} {comparison}
						<Button
							onClick={() => clearOneFilter(column)}
							startIcon={<DeleteIcon />}
						/>
					</span>
					
				
			))}
		</div>
	);
}

export default FilterSelecteds;
