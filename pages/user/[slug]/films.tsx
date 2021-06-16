import MovieFilter from "../../../components/MovieFilter";
import MovieDetails from "../../../components/MovieDetails";
import { useRouter } from "next/router";
import { format_url } from "../../../util/route-functions";
import Pagination from "../../../components/Pagination";
import axios from "axios";
import { GetServerSideProps } from "next";
import { FilterParams, Movie } from "../../../types";

interface FilmProps {
	search: {
		movies: Movie[];
		page: number;
		numPages: number;
		filterParams: FilterParams;
	};
}

const Films = ({ search }: FilmProps) => {
	const { movies, page, numPages, filterParams } = search;
	const router = useRouter();
	const url = format_url(router.asPath);

	return (
		<>
			<MovieFilter filterParams={filterParams} />
			<Pagination currentPage={page} maxPage={numPages} />

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
				<Pagination currentPage={page} maxPage={numPages} />
			</>
		</>
	);
};

export default Films;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};
