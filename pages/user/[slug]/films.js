import MovieFilter from "../../../components/MovieFilter";
import MovieDetails from "../../../components/recommendations/MovieDetails";
import { useRouter } from "next/router";
import { format_url } from "../../../util/route-functions";
import Pagination from "../../../components/Pagination";
import axios from "axios";

const Films = ({ search }) => {
	const { movies, page, numPages } = search;
	const router = useRouter();
	const url = format_url(router.asPath);

	return (
		<>
			<MovieFilter />
			<Pagination currentPage={page} maxPage={numPages} url={url} />

			<>
				<section className="movie-list">
					{movies.length !== 0 &&
						movies.map((movie) => (
							<MovieDetails
								movie={movie}
								key={movie._id}
								url={url}
							/>
						))}
				</section>
				<Pagination currentPage={page} maxPage={numPages} url={url} />
			</>
		</>
	);
};

export default Films;

export async function getServerSideProps(context) {
	const { query } = context;
	const { slug, ...rest } = query;
	let URI = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${slug}/personal`;

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
