import MovieDetails from "../../components/MovieDetails";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";
import { format_url } from "../../util/route-functions";
import axios from "axios";

const Movie = ({ search }) => {
	const { movies, page, numPages, target_movie } = search;
	const router = useRouter();
	const url = format_url(router.asPath);

	return (
		<>
			<h1>
				Movies similar to{" "}
				<span>
					<em>{target_movie}</em>
				</span>
			</h1>

			<Pagination currentPage={page} maxPage={numPages} url={url} />

			<section className="movie-list">
				{movies.length !== 0 &&
					movies.map((movie) => (
						<MovieDetails movie={movie} key={movie._id} url={url} />
					))}
			</section>

			<Pagination currentPage={page} maxPage={numPages} url={url} />
		</>
	);
};

export default Movie;

export async function getServerSideProps(context) {
	const { query } = context;
	const { slug, ...rest } = query;
	let URI = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/movie/${slug}`;

	const options = { params: rest, timeout: 1000 * 60 * 5 };
	const res = await axios.get(URI, options);
	const data = res.data;

	if (!data) {
		return {
			notFound: true
		};
	}

	return { props: { search: data } };
}
