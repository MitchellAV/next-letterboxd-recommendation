import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MovieFilter from "../../components/MovieFilter";

import axios from "axios";
import MovieDetials from "../../components/recommendations/MovieDetails";

const User = () => {
	const router = useRouter();
	const [movies, setMovies] = useState([]);
	useEffect(async () => {
		if (router.isReady) {
			try {
				const { slug, ...filter } = router.query;
				console.log(filter);
				const uri = "http://localhost:5000/user/" + slug;
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
						<MovieDetials movie={movie} key={movie._id} />
					))}
			</section>
		</>
	);
};

export default User;
