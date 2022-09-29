import React from "react";
import FilterByName from "../components/formsTable/filterByName";
import OrdenedFilter from "../components/formsTable/ordenedFilter";
import FilterComparison from "../components/formsTable/filterComparison";
import FilterSelecteds from "../components/formsTable/filterSelecteds";
import TableLogic from "../components/table/tableLogic";

function Table() {
	return (
		<>
			<header className="header-page">
			<img src="https://www.freepnglogos.com/uploads/star-wars-logo-png-8.png" width="200" alt="star wars logo png" className="logo" />
				<FilterComparison />
				<OrdenedFilter />
				<FilterByName />
				<FilterSelecteds />
			</header>
			<section className="body-table">
				<TableLogic />
			</section>
		</>
	);
}
export default Table;
