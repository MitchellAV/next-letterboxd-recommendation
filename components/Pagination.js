const Pages = ({ currentPage, maxPage }) => {
	const pageList = [];
	const ahead = 5;
	const start = currentPage - ahead;
	const end = currentPage + ahead;
	for (let i = start; i <= end; i++) {
		if (i >= 1 && i <= end && i <= maxPage) {
			pageList.push(i);
		}
	}
	return (
		<>
			{pageList.map((page) => (
				<a
					href=""
					className={currentPage === page ? "page current" : "page"}
				>
					{page}
				</a>
			))}
		</>
	);
};

const Pagination = ({ currentPage, maxPage }) => {
	return (
		<>
			{maxPage > 1 && (
				<section className="pagination">
					{currentPage !== 1 && (
						<>
							<a href="" className="first">
								<i className="fa fa-chevron-left"></i>
								<i className="fa fa-chevron-left"></i>
							</a>
							<a href="" className="previous">
								<i className="fa fa-chevron-left"></i>
							</a>
						</>
					)}

					<Pages currentPage={currentPage} maxPage={maxPage} />
					{currentPage !== maxPage && (
						<>
							<a href="" className="next">
								<i className="fa fa-chevron-right"></i>
							</a>
							<a href="" className="last">
								<i className="fa fa-chevron-right"></i>
								<i className="fa fa-chevron-right"></i>
							</a>
						</>
					)}
				</section>
			)}
		</>
	);
};
export default Pagination;
