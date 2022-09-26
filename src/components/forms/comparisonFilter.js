import React, { useContext } from 'react';
import myContext from '../../context/context';

function ComparisonFilter() {
  const { states, functions, setStates } = useContext(myContext);
  const {
    preventForm,
    onHandleClickFilter,
    onClickClearAll } = functions;

  const {
    filterValues,
    optionsOfcolumn,
    disableButton,
  } = states;

  const { setFilterValues } = setStates;

  const onHandleChangeFilter = ({ target }) => {
    const { value, name } = target;
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={ preventForm }>
      <select
        onChange={ onHandleChangeFilter }
        value={ filterValues.column }
        name="column"
        data-testid="column-filter"
      >
        {optionsOfcolumn
          .map((columnValue) => (
            <option value={ columnValue } key={ columnValue }>
              {columnValue}
            </option>
          ))}
      </select>
      <select
        onChange={ onHandleChangeFilter }
        value={ filterValues.comparison }
        name="comparison"
        data-testid="comparison-filter"
      >
        <option value="maior que" selected>
          maior que
        </option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ onHandleChangeFilter }
        value={ filterValues.value }
        data-testid="value-filter"
        name="value"
        type="number"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onHandleClickFilter }
        disabled={ disableButton }
      >
        enviar
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ onClickClearAll }
      >
        limpa
      </button>
    </form>
  );
}

export default ComparisonFilter;
