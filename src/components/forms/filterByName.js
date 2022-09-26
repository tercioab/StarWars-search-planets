import React, { useContext } from 'react';
import myContext from '../../context/context';

function FilterByName() {
  const { functions } = useContext(myContext);
  const { setFilterNameChange } = functions;
  return (
    <form>
      <input
        data-testid="name-filter"
        type="text"
        name="planetName"
        onChange={ setFilterNameChange }
      />
    </form>
  );
}

export default FilterByName;
