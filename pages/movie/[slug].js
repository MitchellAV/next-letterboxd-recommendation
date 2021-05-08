import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MovieDetails from "../../components/recommendations/MovieDetails";
import MovieFilter from "../../components/MovieFilter";

import axios from "axios";

const Movie = () => {
	const router = useRouter();
	const [movies, setMovies] = useState([]);
	useEffect(async () => {
		if (router.isReady) {
			try {
				const { slug, ...filter } = router.query;
				console.log(filter);
				const uri = "http://localhost:5000/movie/" + slug;
				const params = { params: filter };
				const res = await axios.get(uri, params);
				const data = res.data;
				console.log(data);
				setMovies(data.movies);
			} catch (err) {
				console.error(err);
			}
		}
	}, [router]);
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
