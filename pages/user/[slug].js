import MovieFilter from "../../components/MovieFilter";
import MovieDetials from "../../components/recommendations/MovieDetails";
import useFetchMovies from "../../hooks/useFetchMovies";

const User = () => {
	const movies = useFetchMovies("user");
	return (
		<>
			<MovieFilter />
			<section className="movie-list">
				{movies.length !== 0 &&
					movies.map((movie) => (
						<MovieDetials movie={movie} key={movie._id} />
					))}
			</section>
		</>
	);
};

export default User;