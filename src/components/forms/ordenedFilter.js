import React, { useContext } from 'react';
import myContext from '../../context/context';

function OrdenedFilter() {
  const { functions, states, setStates } = useContext(myContext);
  const { sortedOptions } = states;
  const { setSortedOptions, setGroupSortedOptions } = setStates;
  const { preventForm } = functions;

  const sortChange = ({ target }) => {
    const { value, name } = target;
    setSortedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sortClick = () => {
    setGroupSortedOptions(sortedOptions);
  };

  return (
    <form onSubmit={ preventForm }>
      <select
        onChange={ sortChange }
        name="column"
        value={ sortedOptions.column }
        data-testid="column-sort"
      >
        <option value="population" key="population">population</option>
        <option value="orbital_period" key="orbital_period">orbital_period</option>
        <option value="diameter" key="diameter">diameter</option>
        <option value="rotation_period" key="rotation_period">rotation_period</option>
        <option value="surface_water" key="surface_water">surface_water</option>
      </select>
      <label htmlFor="ASC">
        ASC
        <input
          onClick={ sortChange }
          type="radio"
          id="ASC"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          onClick={ sortChange }
          id="DESC"
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sortClick }
      >
        ordenar
      </button>
    </form>
  );
}

export default OrdenedFilter;
