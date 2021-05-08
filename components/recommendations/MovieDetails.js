import { useRouter } from "next/router";
import Link from "next/link";
import { format_url } from "../../util/route-functions";

const MovieDetials = ({ movie }) => {
	const {
		_id,
		title,
		overview,
		vote_count,
		vote_average,
		crew,
		release_date,
		keywords,
		genres,
		original_title,
		cast,
		imdb_id,
		maxTag,
		userRating,
		letterboxd_url
	} = movie;
	const router = useRouter();
	const url = format_url(router.asPath);
	return (
		<article className="movie-container">
			<h2 className="movie-title">{title}</h2>

			<img
				src={`http://localhost:5000/thumbnails/${_id}-thumb.jpg`}
				className="movie-thumb"
				loading="lazy"
				alt={_id}
			/>
			<div className="movie-info">
				{letterboxd_url && (
					<p>
						<a
							className="movie-tag"
							target="_blank"
							href={`https://letterboxd.com${letterboxd_url}`}
						>
							View on Letterboxd
						</a>
					</p>
				)}
				{maxTag && (
					<p>
						<b>Recommended because of Tag: </b>
						<Link
							href={`${url}?filter=${encodeURIComponent(maxTag)}`}
						>
							<a className="movie-tag">{maxTag}</a>
						</Link>
					</p>
				)}
				{userRating && (
					<p>
						<b>User Rating:</b>
						{userRating}
					</p>
				)}
				<p>
					<b>ID:</b>
					<Link href={`/movie/${_id}`}>
						<a className="movie-tag">{_id}</a>
					</Link>
				</p>
				<p>
					<b>Original Title:</b>
					{original_title}
				</p>
				<p>
					<b>IMDB:</b>
					<a
						className="movie-tag"
						target="_blank"
						href={`https://www.imdb.com/title/${imdb_id}`}
					>
						{imdb_id}
					</a>
				</p>
				<p>
					<b>Avg. Rating:</b>
					{vote_average}
				</p>
				<p>
					<b># of Ratings:</b>
					{vote_count}
				</p>
				<p>
					<b>Release Date:</b>
					{release_date}
				</p>
				<p>
					<b>Summary:</b>
					{overview}
				</p>
				{crew.length !== 0 && (
					<>
						<p>
							<b>Crew:</b>
						</p>
						<div className="movie-tag-list">
							{crew.map((tag, i) => (
								<Link
									key={i}
									href={`${url}?filter=${encodeURIComponent(
										tag
									)}`}
								>
									<a className="movie-tag">{tag}</a>
								</Link>
							))}
						</div>
					</>
				)}
				{cast.length !== 0 && (
					<>
						<p>
							<b>Cast:</b>
						</p>
						<div className="movie-tag-list">
							{cast.map((tag, i) => (
								<Link
									key={i}
									href={`${url}?filter=${encodeURIComponent(
										tag
									)}`}
								>
									<a className="movie-tag">{tag}</a>
								</Link>
							))}
						</div>
					</>
				)}
				{keywords.length !== 0 && (
					<>
						<p>
							<b>Keywords:</b>
						</p>
						<div className="movie-tag-list">
							{keywords.map((tag, i) => (
								<Link
									key={i}
									href={`${url}?filter=${encodeURIComponent(
										tag
									)}`}
								>
									<a className="movie-tag">{tag}</a>
								</Link>
							))}
						</div>
					</>
				)}
				{genres.length !== 0 && (
					<>
						<p>
							<b>Genres:</b>
						</p>
						<div className="movie-tag-list">
							{genres.map((tag, i) => (
								<Link
									key={i}
									href={`${url}?filter=${encodeURIComponent(
										tag
									)}`}
								>
									<a className="movie-tag">{tag}</a>
								</Link>
							))}
						</div>
					</>
				)}
			</div>
		</article>
	);
};

export default MovieDetials;
