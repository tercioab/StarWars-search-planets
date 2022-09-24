import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './context';

function MyContextProvider({ children }) {
  const endPoint = 'https://swapi.dev/api/planets';

  const [planetsListApi, setPlanetsOnApi] = useState([]);
  const [planetFilterByName, setFilterByName] = useState('');
  const [filterValues, setFilterValues] = useState({
    value: 0,
    colum: 'population',
    comparison: 'maior que',
  });
  const [groupOfValues, setGroupOfValues] = useState([]);
  const [optionsOfColum, setOptionsColum] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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
      colum: optionsOfColum[0],
      comparison: 'maior que',
    });
    getPlanets();
  }, [optionsOfColum, setPlanetsOnApi]);

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

  const onHanleClick = (e) => {
    e.preventDefault();
    setGroupOfValues((prev) => [...prev, filterValues]);

    const filtredOptions = optionsOfColum.filter((colum) => colum !== filterValues.colum);
    console.log(filtredOptions);

    setOptionsColum(filtredOptions);
  };

  const filteredGroupValues = (planets) => {
    const bools = [];
    groupOfValues.forEach(({ comparison, colum, value }) => {
      if (comparison === 'maior que') {
        bools.push(Number(planets[colum]) > Number(value));
      }
      if (comparison === 'menor que') {
        bools.push(Number(planets[colum]) < Number(value));
      }
      if (comparison === 'igual a') {
        bools.push(Number(planets[colum]) === Number(value));
      }
    });
    return bools.every((el) => el);
  };

  const teste = (e) => {
    e.preventDefault();
  };

  const clear = () => {
    setGroupOfValues([]);
    setOptionsColum([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  const { planetName } = planetFilterByName;
  const planetsValues = {
    planetsApi: planetsListApi,
    functions: {
      filteredGroupValues,
    },
    filter: {
      planetName,
      groupOfValues,
      optionsOfColum,
    },
  };

  return (
    <myContext.Provider value={ planetsValues }>
      <div>
        <form onSubmit={ teste }>
          <input
            data-testid="name-filter"
            type="text"
            name="planetName"
            onChange={ setFilterNameChange }
          />
          <select
            onChange={ onHandleChange }
            value={ filterValues.colum }
            name="colum"
            data-testid="column-filter"
          >
            {optionsOfColum
              .map((columValue) => (
                <option value={ columValue } key={ columValue }>
                  {columValue}
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
            onClick={ clear }
          >
            limpa

          </button>
        </form>
        {groupOfValues.map(({ value, colum, comparison }, i) => (
          <div key={ i }>
            <span data-testid="filter">
              {value}
              {' '}
              {colum}
              {' '}
              {comparison}
              <button onClick={ () => clearOne(colum) } type="button">lixo</button>
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
