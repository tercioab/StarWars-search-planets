import React, { useContext } from 'react';
import myContext from '../context/context';

function Table() {
  const { planetsApi, filter } = useContext(myContext);
  const { planetName, numericFilter } = filter;

  const filterPlanet = planetsApi.filter((planet) => planet.name.match(planetName));
  const filterByNumber = numericFilter
    .map(({ colum, value, comparison }) => filterPlanet.filter(
      (test) => (comparison === 'igual a' && Number(test[colum]) === Number(value))
        || (comparison === 'menor que' && Number(test[colum]) < Number(value))
        || (comparison === 'maior que' && Number(test[colum]) > Number(value)),
    ));

  const numberOfFilter = 0;
  const filterPlanetReturn = filterByNumber.length > numberOfFilter
    ? filterByNumber[filterByNumber.length - 1]
    : filterPlanet;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation</th>
            <th>Orbital</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>SurfaceWater</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {filterPlanetReturn.map(
            ({
              name,
              rotation_period: rotationPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <tr key={ name }>
                <td>{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitalPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
