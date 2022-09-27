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
    <form className='planetName'>
      <label
        htmlFor="planetName"
        className='planetNameInput'>
        Planet Name
        <input
          id="planetName"
          data-testid="name-filter"
          type="text"
          name="planetName"
          onChange={ setFilterNameChange }
        />
      </label>
    </form>
  );
}

export default FilterByName;
