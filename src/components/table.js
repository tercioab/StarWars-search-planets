import React, { useContext } from 'react';
import myContext from '../context/context';

function Table() {
  const { planetsApi, functions, groupSortedOptions } = useContext(myContext);
  const { filteredGroupValues, filterHandleName } = functions;

  const sortedColumnValues = (a, b) => {
    const { column, sort } = groupSortedOptions;
    const DESC = a[column] - b[column];
    const ASC = b[column] - a[column];

    if (sort === 'ASC') { return ASC; }
    if (sort === 'DESC') { return DESC; }
    if (sort === '') return planetsApi;
  };

  const removeUnknown = (a) => {
    const { column, sort } = groupSortedOptions;
    return sort && !Number.isNaN(+a[column]) ? +'-1' : 0;
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
            .filter(filterHandleName)
            .filter(filteredGroupValues)
            .sort(sortedColumnValues)
            .sort(removeUnknown)
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
                  <td data-testid="planet-name">{name}</td>
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
