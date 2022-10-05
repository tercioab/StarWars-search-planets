import React from "react";
import FilterByName from "../components/formsTable/filterByName";
import OrdenedFilter from "../components/formsTable/ordenedFilter";
import FilterComparison from "../components/formsTable/filterComparison";
import FilterSelecteds from "../components/formsTable/filterSelecteds";
import TableLogic from "../components/table/tableLogic";
import { useContext } from "react";
import myContext from "../context/context";

function Table() {
	const { states } = useContext(myContext);
	const { loading } = states;
	return (
		<div>
			{loading ? (
				<div className="loading">
					<img
						alt='estrela-da-morte'
						className='starDeath'
						src='https://i.pinimg.com/originals/3d/ec/7e/3dec7e73407a05cff27bfdaed598c020.png'
					/>
					<h5>LOADING...</h5>
				</div>
			) : (
				<>
					<header className='header-page'>
						<img
							src='https://www.freepnglogos.com/uploads/star-wars-logo-png-8.png'
							width='200'
							alt='star wars logo png'
							className='logo'
						/>

						<FilterComparison />
						<OrdenedFilter />
						<FilterByName />
						<FilterSelecteds />
					</header>
					<section className='body-table'>
						<TableLogic />
					</section>
				</>
			)}
		</div>
	);
}
export default Table;
