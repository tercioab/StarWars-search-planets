import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './context';

function MyContextProvider({ children }) {
  const endPoint = 'https://swapi.dev/api/planets';

  const [planetsListApi, setPlanetsOnApi] = useState([]);
  const [planetFilterByName, setFilterByName] = useState('');
  const [filterValues, setFilterValues] = useState({
    value: 0,
    column: 'population',
    comparison: 'maior que',
  });
  const [groupOfValues, setGroupOfValues] = useState([]);
  const [optionsOfcolumn, setOptionscolumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [sortedOptions, setSortedOptions] = useState({
    column: 'population',
    sort: '',
  });

  const [groupSortedOptions, setGroupSortedOptions] = useState({});

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch(endPoint);
      const { results } = await response.json();
      const planets = await results.map((planetas) => {
        delete planetas.residents;
        return planetas;
      });
      setPlanetsOnApi(planets);
    };
    setFilterValues({
      value: 0,
      column: optionsOfcolumn[0],
      comparison: 'maior que',
    });
    getPlanets();
  }, [optionsOfcolumn, setPlanetsOnApi]);

  const setFilterNameChange = ({ target }) => {
    const { value, name } = target;
    setFilterByName({
      [name]: value,
    });
  };

  const onHandleChange = ({ target }) => {
    const { value, name } = target;
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const onHanleClick = () => {
    setGroupOfValues((prev) => [...prev, filterValues]);
    const filtredOptions = optionsOfcolumn
      .filter((column) => column !== filterValues.column);
    setOptionscolumn(filtredOptions);
  };

  const filteredGroupValues = (planets) => {
    const bools = [];
    groupOfValues.forEach(({ comparison, column, value }) => {
      if (comparison === 'maior que') {
        bools.push(Number(planets[column]) > Number(value));
      }
      if (comparison === 'menor que') {
        bools.push(Number(planets[column]) < Number(value));
      }
      if (comparison === 'igual a') {
        bools.push(Number(planets[column]) === Number(value));
      }
    });
    return bools.every((el) => el);
  };

  const prevent = (e) => {
    e.preventDefault();
  };

  const onClickClearAll = () => {
    setGroupOfValues([]);
    setOptionscolumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  const clearOne = (column) => {
    const unusedOptions = groupOfValues
      .filter((valuesFilter) => valuesFilter.column !== column);
    setGroupOfValues(unusedOptions);

    setOptionscolumn((prev) => [...prev, column]);
  };
  const { planetName } = planetFilterByName;

  const filterHandleName = (planets) => planets.name.match(planetName);
  const planetsValues = {
    planetsApi: planetsListApi,
    groupSortedOptions,
    functions: {
      filteredGroupValues,
      filterHandleName,
    },
  };

  return (
    <myContext.Provider value={ planetsValues }>
      <div>
        <form onSubmit={ prevent }>
          <input
            data-testid="name-filter"
            type="text"
            name="planetName"
            onChange={ setFilterNameChange }
          />
          <select
            onChange={ onHandleChange }
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
            onChange={ onHandleChange }
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
            onChange={ onHandleChange }
            value={ filterValues.value }
            data-testid="value-filter"
            name="value"
            type="number"
          />

          <button
            type="button"
            data-testid="button-filter"
            onClick={ onHanleClick }
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
        <form onSubmit={ prevent }>
          <select
            onChange={ sortChange }
            name="column"
            data-testid="column-sort"
          >
            <option value="population" key="population">population</option>
            <option value="orbital_period" key="orbital_period">orbital_period</option>
            <option value="diameter" key="diameter">diameter</option>
            <option value="rotation_period" key="rotation_period">rotation_period</option>
            <option value="surface_water" key="surface_water">surface_water</option>
          </select>
          <input
            onClick={ sortChange }
            type="radio"
            name="sort"
            data-testid="column-sort-input-asc"
            value="ASC"
          />
          <input
            onClick={ sortChange }
            type="radio"
            name="sort"
            data-testid="column-sort-input-desc"
            value="DESC"
          />
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ sortClick }
          >
            ordenar

          </button>
        </form>
        {groupOfValues.map(({ value, column, comparison }, i) => (
          <div key={ i }>
            <span data-testid="filter">
              {value}
              {' '}
              {column}
              {' '}
              {comparison}
              <button onClick={ () => clearOne(column) } type="button">lixo</button>
            </span>
            <p />
          </div>
        ))}
      </div>
      {children}
    </myContext.Provider>
  );
}

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MyContextProvider;
