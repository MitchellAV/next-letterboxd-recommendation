import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const useFetchMovies = (location) => {
	const router = useRouter();
	const [movies, setMovies] = useState([]);
	useEffect(async () => {
		if (router.isReady) {
			try {
				const { slug, ...filter } = router.query;
				console.log(filter);
				let URI = "";
				switch (location) {
					case "user":
						URI = "http://localhost:5000/user/" + slug;
						break;
					case "movie":
						URI = "http://localhost:5000/movie/" + slug;
						break;
					case "personal":
						URI = `http://localhost:5000/user/${slug}/personal`;
						break;

					default:
						break;
				}
				const params = { params: filter };
				const res = await axios.get(URI, params);
				const data = res.data;
				console.log(data);
				setMovies(data.movies);
			} catch (err) {
				console.error(err);
			}
		}
	}, [router]);
	return movies;
};

export default useFetchMovies;
