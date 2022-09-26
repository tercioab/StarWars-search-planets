import React, { useContext } from 'react';
import myContext from '../../context/context';

function FilterByName() {
  const { setStates } = useContext(myContext);
  const { setFilterByName } = setStates;

  const setFilterNameChange = ({ target }) => {
    const { value, name } = target;
    setFilterByName({
      [name]: value,
    });
  };

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
