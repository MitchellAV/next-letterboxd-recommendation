import Link from "next/link";
const Pages = ({ currentPage, maxPage, url }) => {
	const pageList = [];
	const ahead = 5;
	const start = currentPage - ahead;
	const end = currentPage + ahead;
	for (let i = start; i <= end; i++) {
		if (i >= 1 && i <= end && i <= maxPage) {
			pageList.push(i);
		}
	}
	console.log(url);
	return (
		<>
			{pageList.map((page) => (
				<Link href={`${url}?page=${encodeURIComponent(page)}`}>
					<a
						className={
							currentPage === page ? "page current" : "page"
						}
					>
						{page}
					</a>
				</Link>
			))}
		</>
	);
};

const Pagination = ({ currentPage, maxPage, url }) => {
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

					<Pages
						currentPage={currentPage}
						maxPage={maxPage}
						url={url}
					/>
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
