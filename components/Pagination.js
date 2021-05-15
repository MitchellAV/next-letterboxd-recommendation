import Link from "next/link";

import { useRouter } from "next/router";
const Pages = ({ currentPage, maxPage, query, pathname }) => {
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
				<Link
					href={{
						pathname,
						query: { ...query, page }
					}}
				>
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

const Pagination = ({ currentPage, maxPage }) => {
	const router = useRouter();

	const pathname = router.pathname;
	const query = router.query;
	return (
		<>
			{maxPage > 1 && (
				<section className="pagination">
					{currentPage !== 1 && (
						<>
							<Link
								href={{
									pathname,
									query: { ...query, page: 1 }
								}}
							>
								<a className="first">
									<i className="fa fa-chevron-left"></i>
									<i className="fa fa-chevron-left"></i>
								</a>
							</Link>
							<Link
								href={{
									pathname,
									query: { ...query, page: currentPage - 1 }
								}}
							>
								<a className="previous">
									<i className="fa fa-chevron-left"></i>
								</a>
							</Link>
						</>
					)}

					<Pages
						currentPage={currentPage}
						maxPage={maxPage}
						pathname={pathname}
						query={query}
					/>
					{currentPage !== maxPage && (
						<>
							<Link
								href={{
									pathname,
									query: { ...query, page: currentPage + 1 }
								}}
							>
								<a className="next">
									<i className="fa fa-chevron-right"></i>
								</a>
							</Link>
							<Link
								href={{
									pathname,
									query: { ...query, page: maxPage }
								}}
							>
								<a className="last">
									<i className="fa fa-chevron-right"></i>
									<i className="fa fa-chevron-right"></i>
								</a>
							</Link>
						</>
					)}
				</section>
			)}
		</>
	);
};
export default Pagination;
