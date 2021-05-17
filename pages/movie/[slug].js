import MovieDetails from "../../components/recommendations/MovieDetails";
import Pagination from "../../components/Pagination";

import useFetchMovies from "../../hooks/useFetchMovies";
import { useRouter } from "next/router";
import { useState } from "react";
import { format_url } from "../../util/route-functions";

const Movie = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { movies, page, numPages, target_movie } = useFetchMovies(
		"movie",
		setIsLoading
	);
	const router = useRouter();
	const url = format_url(router.asPath);

	return (
		<>
			{isLoading || (
				<h1>
					Movies similar to <em>{target_movie}</em>
				</h1>
			)}
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

export default Movie;
