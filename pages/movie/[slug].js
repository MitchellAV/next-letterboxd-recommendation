import MovieDetails from "../../components/recommendations/MovieDetails";
import MovieFilter from "../../components/MovieFilter";
import useFetchMovies from "../../hooks/useFetchMovies";

const Movie = () => {
	const movies = useFetchMovies("movie");
	return (
		<>
			<MovieFilter />
			<section className="movie-list">
				{movies.length !== 0 &&
					movies.map((movie) => (
						<MovieDetails movie={movie} key={movie._id} />
					))}
			</section>
		</>
	);
};

export default Movie;
