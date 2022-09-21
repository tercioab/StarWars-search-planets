import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './context';

function MyContextProvider({ children }) {
  const endPoint = 'https://swapi.dev/api/planets';

  const [planetsListApi, setPlanetsOnApi] = useState([]);
  const [planetFilter, setFilter] = useState({});

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

  const setFilterChange = ({ target }) => {
    const { value, name } = target;
    setFilter({
      [name]: value,
    });
  };

  const planetsValues = {
    planetsApi: planetsListApi,
    filter: { planetName: planetFilter.planetName },
  };

  return (
    <myContext.Provider value={ planetsValues }>
      <form>
        <input
          data-testid="name-filter"
          type="text"
          name="planetName"
          onChange={ setFilterChange }
        />
      </form>
      {children}
    </myContext.Provider>
  );
}

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyContextProvider;
