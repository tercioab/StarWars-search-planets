import React, { useContext } from 'react';
import myContext from '../context/context';

function Table() {
  const { planetsApi, filter } = useContext(myContext);
  const { planetName, numericFilter } = filter;

  const filterPlanet = planetsApi.filter((planet) => planet.name.match(planetName));
  const filterByNumber = numericFilter
    .map(({ colum, value, comparison }) => filterPlanet.filter(
      (test) => (comparison === 'igual a' && test[colum] === value)
        || (comparison === 'menor que' && test[colum] < value)
        || (comparison === 'maior que' && test[colum] > value),
    ));
  const numberOfFilter = 0;
  const decideTeste = filterByNumber.length > numberOfFilter
    ? filterByNumber[filterByNumber.length - 1]
    : filterPlanet;

  console.log(decideTeste);
  return (
    <div>
      <table>
        <tbody>
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
          {decideTeste.map(
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
