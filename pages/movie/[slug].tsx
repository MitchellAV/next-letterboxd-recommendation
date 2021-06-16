import MovieDetails from "../../components/MovieDetails";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";
import { format_url } from "../../util/route-functions";
import { GetServerSideProps } from "next";
import axios from "axios";

interface MovieProps {
	search: {
		movies: any[];
		page: number;
		numPages: number;
		target_movie: string;
	};
}

const Movie = ({ search }: MovieProps) => {
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

			<Pagination currentPage={page} maxPage={numPages} />

			<section className="movie-list">
				{movies.length !== 0 &&
					movies.map((movie) => (
						<MovieDetails movie={movie} key={movie._id} url={url} />
					))}
			</section>

			<Pagination currentPage={page} maxPage={numPages} />
		</>
	);
};

export default Movie;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};
