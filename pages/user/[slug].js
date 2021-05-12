import MovieFilter from "../../components/MovieFilter";
import Pagination from "../../components/Pagination";
import MovieDetails from "../../components/recommendations/MovieDetails";
import useFetchMovies from "../../hooks/useFetchMovies";
import { useRouter } from "next/router";
import { useState } from "react";
import { format_url } from "../../util/route-functions";

const User = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { movies, page, numPages } = useFetchMovies("user", setIsLoading);
	const router = useRouter();
	const url = format_url(router.asPath);

	return (
		<>
			<MovieFilter />
			<Pagination currentPage={page} maxPage={numPages} url={url} />
			{isLoading ? (
				<div className="loading">
					<i className=" fa fa-spinner fa-spin fa-3x fa-fw"></i>
					<h2>Loading Movies...</h2>
				</div>
			) : (
				<section className="movie-list">
					{movies.length !== 0 &&
						movies.map((movie) => (
							<MovieDetails
								movie={movie}
								key={movie._id}
								url={url}
							/>
						))}
				</section>
			)}
			<Pagination currentPage={page} maxPage={numPages} url={url} />
		</>
	);
};

export default User;
