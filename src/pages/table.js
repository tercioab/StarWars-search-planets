import React from 'react';
import FilterByName from '../components/forms/filterByName';
import OrdenedFilter from '../components/forms/ordenedFilter';
import ComparisonFilter from '../components/forms/comparisonFilter';
import FilterSelecteds from '../components/forms/filterSelecteds';
import TableLogic from '../components/table/tableLogic';

function Table() {
  return (
    <>
      <ComparisonFilter />
      <FilterByName />
      <OrdenedFilter />
      <FilterSelecteds />
      <TableLogic />
    </>
  );
}
export default Table;
