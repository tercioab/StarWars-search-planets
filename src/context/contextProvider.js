import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './context';

function MyContextProvider({ children }) {
  const endPoint = 'https://swapi.dev/api/planets';

  const [planetsListApi, setPlanetsOnApi] = useState([]);
  const [planetFilterByName, setFilterByName] = useState({});
  const [groupValuesFilter, setValuesOfFilter] = useState({
    value: 0,
    colum: 'population',
    comparison: 'maior que',

  });
  const [NumericValues, setFilterBynumericValues] = useState([]);

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

  const clickFilterGroup = ({ target }) => {
    const { value, name } = target;
    setValuesOfFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const OnNumericValues = (e) => {
    e.preventDefault();
    setFilterBynumericValues((prev) => ([
      ...prev,
      groupValuesFilter,
    ]));
  };

  const planetsValues = {
    planetsApi: planetsListApi,
    filter: {
      planetName: planetFilterByName.planetName,
      numericFilter: NumericValues,
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
            onClick={ clickFilterGroup }
            name="colum"
            data-testid="column-filter"
          >
            <option value="population" selected>population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period ">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
          <select
            onClick={ clickFilterGroup }
            name="comparison"
            data-testid="comparison-filter"
          >
            <option value="maior que" selected>maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            onChange={ clickFilterGroup }
            data-testid="value-filter"
            name="value"
            type="number"
            value={ groupValuesFilter.value }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ OnNumericValues }
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
