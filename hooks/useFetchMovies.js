import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const useFetchMovies = (location, setIsLoading) => {
	const router = useRouter();
	const [response, setResponse] = useState({
		movies: [],
		page: 1,
		maxPage: 1
	});
	useEffect(async () => {
		setIsLoading(true);
		if (router.isReady) {
			try {
				const { slug, ...filter } = router.query;
				console.log(filter);
				let URI = "";
				switch (location) {
					case "user":
						URI =
							"http://api.letterboxd-recommendation.com/user/" +
							slug;
						break;
					case "movie":
						URI =
							"http://api.letterboxd-recommendation.com/movie/" +
							slug;
						break;
					case "personal":
						URI = `http://api.letterboxd-recommendation.com/user/${slug}/personal`;
						break;

					default:
						break;
				}
				const params = { params: filter };
				const res = await axios.get(URI, params);
				const data = res.data;
				console.log(data);
				setResponse(data);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
			}
		}
	}, [router]);
	return response;
};

export default useFetchMovies;
