import React from "react";
import FilterByName from "../components/formsTable/filterByName";
import OrdenedFilter from "../components/formsTable/ordenedFilter";
import FilterComparison from "../components/formsTable/filterComparison";
import FilterSelecteds from "../components/formsTable/filterSelecteds";
import TableLogic from "../components/table/tableLogic";

function Table() {
	return (
		<>
			<header>
				<img alt="starwars" src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-1-1.png" className="logo"/>
				<FilterComparison />
				<FilterByName />
				<OrdenedFilter />
				<FilterSelecteds />
			</header>
			<body className="body-table">
				<TableLogic />
			</body>
		</>
	);
}
export default Table;