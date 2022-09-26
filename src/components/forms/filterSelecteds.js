import React, { useContext } from 'react';
import myContext from '../../context/context';

function FilterSelecteds() {
  const { states, setStates } = useContext(myContext);
  const { groupOfValues, disableButton, optionsOfcolumn } = states;
  const { setOptionscolumn, setGroupOfValues, setDisableButton } = setStates;

  const clearOneFilter = (column) => {
    const unusedOptions = groupOfValues
      .filter((valuesFilter) => valuesFilter.column !== column);
    setGroupOfValues(unusedOptions);
    setOptionscolumn((prev) => [...prev, column]);
    if (optionsOfcolumn.length === 0) { setDisableButton(false); }
  };

  return (
    <div>
      {disableButton && 'todos os filtros já foram utilizados'}
      {groupOfValues.map(({ value, column, comparison }, i) => (
        <div key={ i }>
          <span data-testid="filter">
            {value}
            {' '}
            {column}
            {' '}
            {comparison}
            <button onClick={ () => clearOneFilter(column) } type="button">lixo</button>
          </span>
          <p />
        </div>
      ))}
    </div>
  );
}

export default FilterSelecteds;
