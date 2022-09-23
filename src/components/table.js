import React, { useContext } from 'react';
import myContext from '../context/context';

function Table() {
  const { planetsApi, filter } = useContext(myContext);
  const { planetName, groupOfValues } = filter;

  // const planetss = planetsApi
  //   .map((planets) => groupOfValues
  //     .forEach((filtro) => {
  //       const obj = [];
  //       obj.push(planets.population === filtro.value);
  //       return obj.every((el) => el);
  //     }));

  // const filtered = (linha) => {
  //   const bools = [];
  //   groupOfValues.forEach((filtro) => {
  //     bools.push(Number(linha[filtro.colum]) === Number(filtro.value));
  //   });
  //   return bools.every((el) => el);
  // };

  const filtered = (linha) => {
    const bools = [];
    groupOfValues.forEach((filtro) => {
      if (filtro.comparison === 'maior que') {
        bools.push(Number(linha[filtro.colum]) > Number(filtro.value));
      }
      if (filtro.comparison === 'menor que') {
        bools.push(Number(linha[filtro.colum]) < Number(filtro.value));
      }
      if (filtro.comparison === 'igual a') {
        bools.push(Number(linha[filtro.colum]) === Number(filtro.value));
      }
    });
    return bools.every((el) => el);
  };

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
          {planetsApi
            .filter((planets) => planets.name.match(planetName))
            .filter(filtered)
            .map(
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
