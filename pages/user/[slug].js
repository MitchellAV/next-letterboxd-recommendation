import MovieFilter from "../../components/MovieFilter";
import Pagination from "../../components/Pagination";
import MovieDetials from "../../components/recommendations/MovieDetails";
import useFetchMovies from "../../hooks/useFetchMovies";
import { useState } from "react";

const User = () => {
	const movies = useFetchMovies("user");
	const maxPage = 10;
	const [currentPage, setCurrentPage] = useState(10);

	return (
		<>
			<MovieFilter />
			<Pagination currentPage={currentPage} maxPage={maxPage} />
			<section className="movie-list">
				{movies.length !== 0 &&
					movies.map((movie) => (
						<MovieDetials movie={movie} key={movie._id} />
					))}
			</section>
			<Pagination currentPage={currentPage} maxPage={maxPage} />
		</>
	);
};

export default User;
