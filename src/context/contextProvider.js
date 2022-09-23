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
    getPlanets();
  }, [setPlanetsOnApi]);

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
    setGroupOfValues((prev) => ([
      ...prev,
      filterValues,
    ]));
    setFilterValues({
      value: 0,
      colum: 'population',
      comparison: 'maior que',
    });
  };

  const { planetName } = planetFilterByName;
  const planetsValues = {
    planetsApi: planetsListApi,
    filter: {
      planetName,
      groupOfValues,
    },
  };

  return (
    <myContext.Provider value={ planetsValues }>
      <div>
        <form>
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
            <option value="population" selected>population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>

          <select
            onChange={ onHandleChange }
            value={ filterValues.comparison }
            name="comparison"
            data-testid="comparison-filter"
          >
            <option value="maior que" selected>maior que</option>
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
        </form>
        {groupOfValues.map(({ value, colum, comparison }, i) => (
          <div key={ i }>
            <span>
              {value}
              {' '}
              {colum}
              {' '}
              {comparison }
            </span>
            <p />
          </div>))}
      </div>
      {children}
    </myContext.Provider>
  );
}

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyContextProvider;
