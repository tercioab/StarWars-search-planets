import React, { useContext } from "react";
import myContext from "../../context/context";

function FilterComparison() {
	const { states, functions, setStates } = useContext(myContext);
	const { preventForm } = functions;

	const { filterValues, optionsOfcolumn, disableButton } = states;

	const { setFilterValues, setGroupOfValues, setOptionscolumn } = setStates;

	const onHandleChangeFilter = ({ target }) => {
		const { value, name } = target;
		setFilterValues(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const onHandleClickFilter = () => {
		setGroupOfValues(prev => [...prev, filterValues]);
		const filtredOptions = optionsOfcolumn.filter(
			column => column !== filterValues.column,
		);
		setOptionscolumn(filtredOptions);
	};

	const onClickClearAll = () => {
		setGroupOfValues([]);
		setOptionscolumn([
			"population",
			"orbital_period",
			"diameter",
			"rotation_period",
			"surface_water",
		]);
	};

	return (
		<div>
			<form onSubmit={preventForm} className='columnFilter'>
				<div className='formContent'>
					<label htmlFor='column'>
						Select Column{" "}
						<select
							onChange={onHandleChangeFilter}
							value={filterValues.column}
							id='column'
							name='column'
							data-testid='column-filter'
						>
							{optionsOfcolumn.map(columnValue => (
								<option value={columnValue} key={columnValue}>
									{columnValue}
								</option>
							))}
						</select>
					</label>
					<label htmlFor='comparison'>
						Comparison{" "}
						<select
							id='comparison'
							onChange={onHandleChangeFilter}
							value={filterValues.comparison}
							name='comparison'
							data-testid='comparison-filter'
						>
							<option value='maior que' selected>
								Maior Que
							</option>
							<option value='menor que'>Menor Que</option>
							<option value='igual a'>Igual A</option>
						</select>
					</label>
					<label htmlFor='number'>
						Number{" "}
						<input
							id='number'
							onChange={onHandleChangeFilter}
							value={filterValues.value}
							data-testid='value-filter'
							name='value'
							type='number'
						/>
					</label>

					
				
				</div>
				<section className="btn-form-comparison">
						<button
							type='button'
							id='submitButton'
							data-testid='button-filter'
							onClick={onHandleClickFilter}
							disabled={disableButton}
						>
							SUBMIT
						</button>
						<button
							data-testid='button-remove-filters'
							type='button'
							onClick={onClickClearAll}
						>
							CLEAR
						</button>
					</section>
			</form>
		</div>
	);
}

export default FilterComparison;
