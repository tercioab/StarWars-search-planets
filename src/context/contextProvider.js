import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './context';

function MyContextProvider({ children }) {
  const endPoint = 'https://swapi.dev/api/planets';
  const [planetsList, setPlanets] = useState([]);
  const [planetFilter, setFilter] = useState({});

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch(endPoint);
      const { results } = await response.json();
      const planets = results.map((planetas) => {
        delete planetas.residents; return planetas;
      });
      setPlanets(planets);
    };
    getPlanets();
  },
  []);

  const onHandlechange = ({ target }) => {
    const { value, name } = target;
    setFilter({
      [name]: value,
    });
  };

  const planetsObj = {
    planets: planetsList,
    filter: planetFilter,
  };

  return (
    <myContext.Provider value={ planetsObj }>
      <form>
        <input
          data-testid="name-filter"
          type="text"
          name="planetName"
          onChange={ onHandlechange }
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
