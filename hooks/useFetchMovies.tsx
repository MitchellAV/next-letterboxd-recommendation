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
				const { slug, ...query } = router.query;
				console.log(query);
				let URI = "";
				switch (location) {
					case "user":
						URI = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${slug}`;
						break;
					case "movie":
						URI = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/movie/${slug}`;
						break;
					case "personal":
						URI = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${slug}/personal`;
						break;

					default:
						break;
				}
				const params = { params: query, timeout: 1000 * 60 * 5 };
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
