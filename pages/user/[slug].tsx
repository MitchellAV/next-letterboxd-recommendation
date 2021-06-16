import MovieFilter from "../../components/MovieFilter";
import Pagination from "../../components/Pagination";
import MovieDetails from "../../components/MovieDetails";
import { useRouter } from "next/router";
import { format_url } from "../../util/route-functions";
import axios from "axios";

import { GetServerSideProps } from "next";
import { FilterParams } from "../../types";
interface UserProps {
	search: {
		movies: any[];
		page: number;
		numPages: number;
		filterParams: FilterParams;
	};
}

const User = ({ search }: UserProps) => {
	const { movies, page, numPages, filterParams } = search;
	const router = useRouter();
	const url = format_url(router.asPath);

	return (
		<>
			<MovieFilter filterParams={filterParams} />
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

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const { slug, ...rest } = query;
	const URI = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${slug}`;

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
