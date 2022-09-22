import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './context';

function MyContextProvider({ children }) {
  const endPoint = 'https://swapi.dev/api/planets';

  const [planetsListApi, setPlanetsOnApi] = useState([]);
  const [planetFilterByName, setFilterByName] = useState({});

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch(endPoint);
      const { results } = await response.json();
      const planets = results.map((planetas) => {
        delete planetas.residents;
        return planetas;
      });
      setPlanetsOnApi(planets);
    };
    getPlanets();
  }, []);

  const setFilterNameChange = ({ target }) => {
    const { value, name } = target;
    setFilterByName({
      [name]: value,
    });
  };

  const planetsValues = {
    planetsApi: planetsListApi,
    filter: {
      planetName: planetFilterByName.planetName,
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
        </form>
        <form>
          <select data-testid="column-filter">
            <option name="columFilter" value="population" selected>population</option>
            <option name="columFilter" value="orbital_period">orbital_period</option>
            <option name="columFilter" value="diameter">diameter</option>
            <option name="columFilter" value="rotation_period ">rotation_period</option>
            <option name="columFilter" value="surface_water">surface_water</option>
          </select>
          <select data-testid="comparison-filter">
            <option name="comparisonFilter" value="maior" selected>maior que</option>
            <option name="comparisonFilter" value="menor">menor que</option>
            <option name="comparisonFilter" value="igual">igual a</option>
          </select>
          <input
            data-testid="value-filter"
            name="number"
            type="number"
          />
          <button
            type="submit"
            data-testid="button-filter"
          >
            enviar

          </button>
        </form>
      </div>
      {children}
    </myContext.Provider>
  );
}

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyContextProvider;
