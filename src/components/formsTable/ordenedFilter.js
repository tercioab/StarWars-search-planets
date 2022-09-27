import React, { useContext } from "react";
import myContext from "../../context/context";
import { Radio} from "@mui/material";

function OrdenedFilter() {
	const { functions, states, setStates } = useContext(myContext);
	const { sortedOptions } = states;
	const { setSortedOptions, setGroupSortedOptions } = setStates;
	const { preventForm } = functions;

	const sortChange = ({ target }) => {
		const { value, name } = target;
		setSortedOptions(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const sortClick = () => {
		setGroupSortedOptions(sortedOptions);
	};

	return (
		<form onSubmit={preventForm} className='sortedForm'>
			<label htmlFor='sortedOptions'>
				Order By
				{" "}
				<select
					id='sortedOptions'
					onChange={sortChange}
					name='column'
					value={sortedOptions.column}
					data-testid='column-sort'
				>
					<option value='population' key='population'>
						population
					</option>
					<option value='orbital_period' key='orbital_period'>
						orbital_period
					</option>
					<option value='diameter' key='diameter'>
						diameter
					</option>
					<option value='rotation_period' key='rotation_period'>
						rotation_period
					</option>
					<option value='surface_water' key='surface_water'>
						surface_water
					</option>
				</select>
			</label>

			<label htmlFor='DESC'>
				DESC
				{" "}
				<input
					id='DESC'
					onClick={sortChange}
					type='radio'
					name='sort'
					data-testid='column-sort-input-desc'
					value='DESC'
					control={<Radio />}
					label='DESC'
				/>
			</label>
			{" "}
			<label htmlFor="ASC">
				ASC
				{" "}
				<input
					type='radio'
					id='ASC'
					onClick={sortChange}
					name='sort'
					data-testid='column-sort-input-asc'
					value='ASC'
					control={<Radio />}
					label='ASC'
				/>
			</label>

			<button
				variant='contained'
				type='button'
				data-testid='column-sort-button'
				onClick={sortClick}
			>
				ORDER
			</button>
		</form>
	);
}

export default OrdenedFilter;
