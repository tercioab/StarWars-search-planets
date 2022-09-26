import React, { useContext } from 'react';
import myContext from '../../context/context';

function FilterSelecteds() {
  const { functions, states } = useContext(myContext);
  const { groupOfValues, disableButton } = states;
  const { clearOneFilter } = functions;
  return (
    <div>
      {disableButton && 'todos os filtros foram utilizados'}
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
