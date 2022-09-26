import React from 'react';
import FilterByName from '../components/forms/filterByName';
import OrdenedFilter from '../components/forms/ordenedFilter';
import FilterComparison from '../components/forms/filterComparison';
import FilterSelecteds from '../components/forms/filterSelecteds';
import TableLogic from '../components/table/tableLogic';

function Table() {
  return (
    <>
      <FilterComparison />
      <FilterByName />
      <OrdenedFilter />
      <FilterSelecteds />
      <TableLogic />
    </>
  );
}
export default Table;
