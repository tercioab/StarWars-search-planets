import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './context';

function MyContextProvider({ children }) {
  const endPoint = 'https://swapi.dev/api/planets';
  const [planetsList, setPlanets] = useState([]);

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

  const planetsObj = {
    planets: planetsList,
  };

  return (
    <myContext.Provider value={ planetsObj }>
      {children}
    </myContext.Provider>
  );
}

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyContextProvider;
