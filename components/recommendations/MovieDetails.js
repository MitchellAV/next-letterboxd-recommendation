import { useState } from "react";
import Link from "next/link";

const MovieDetials = ({ movie, url }) => {
	const [isClicked, setIsClicked] = useState(false);
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
		runtime,
		maxTag,
		userRating,
		letterboxd_url
	} = movie;

	return (
		<article
			className="movie-container"
			onClick={() => setIsClicked(!isClicked)}
		>
			<h2 className="movie-title">{title}</h2>
			<div className="movie-info">
				<img
					src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/thumbnails/${_id}-thumb.jpg`}
					className="movie-thumb"
					loading="lazy"
					alt={_id}
				/>
				<div>
					<div className="movie-links">
						<Link href={`/movie/${_id}`}>
							<a className="movie-tag">Similar Movies</a>
						</Link>

						{letterboxd_url && (
							<a
								className="movie-tag"
								target="_blank"
								href={`https://letterboxd.com${letterboxd_url}`}
							>
								View on Letterboxd
							</a>
						)}
						{imdb_id && (
							<a
								className="movie-tag"
								target="_blank"
								href={`https://www.imdb.com/title/${imdb_id}`}
							>
								View on IMDb
							</a>
						)}
					</div>
					{maxTag && (
						<>
							<div className="movie-info-group">
								<h3>Recommended because of Tag: </h3>
								<Link
									href={`${url}?filter=${encodeURIComponent(
										maxTag
									)}`}
								>
									<a className="movie-tag">{maxTag}</a>
								</Link>
							</div>
						</>
					)}
					{userRating && (
						<div className="movie-info-group">
							<h3>User Rating: </h3>
							<p>{userRating.toFixed(1)}</p>
						</div>
					)}
					<div className="movie-info-group">
						<h3>Original Title: </h3>
						<p>{original_title}</p>
					</div>
					<div className="movie-info-group">
						<h3>Runtime: </h3>
						<p>{runtime} mins.</p>
					</div>

					<div className="movie-info-group">
						<h3>Avg. Rating: </h3>
						<p>{vote_average}</p>
					</div>
					<div className="movie-info-group">
						<h3># of Ratings: </h3>
						<p>{vote_count}</p>
					</div>
					<div className="movie-info-group">
						<h3>Release Date: </h3>
						<p>{release_date}</p>
					</div>
					<div className="movie-info-group">
						<h3>Summary: </h3>
						<p>{overview}</p>
					</div>
					{isClicked && (
						<>
							{crew.length !== 0 && (
								<>
									<div className="movie-info-group">
										<h3>Crew: </h3>
									</div>
									<div className="movie-tag-list">
										{crew.map((tag, i) => (
											<Link
												key={i}
												href={`${url}?filter=${encodeURIComponent(
													tag
												)}`}
											>
												<a className="movie-tag">
													{tag}
												</a>
											</Link>
										))}
									</div>
								</>
							)}
							{cast.length !== 0 && (
								<>
									<div className="movie-info-group">
										<h3>Cast: </h3>
									</div>
									<div className="movie-tag-list">
										{cast.map((tag, i) => (
											<Link
												key={i}
												href={`${url}?filter=${encodeURIComponent(
													tag
												)}`}
											>
												<a className="movie-tag">
													{tag}
												</a>
											</Link>
										))}
									</div>
								</>
							)}
							{keywords.length !== 0 && (
								<>
									<div className="movie-info-group">
										<h3>Keywords: </h3>
									</div>
									<div className="movie-tag-list">
										{keywords.map((tag, i) => (
											<Link
												key={i}
												href={`${url}?filter=${encodeURIComponent(
													tag
												)}`}
											>
												<a className="movie-tag">
													{tag}
												</a>
											</Link>
										))}
									</div>
								</>
							)}
							{genres.length !== 0 && (
								<>
									<div className="movie-info-group">
										<h3>Genres: </h3>
									</div>
									<div className="movie-tag-list">
										{genres.map((tag, i) => (
											<Link
												key={i}
												href={`${url}?filter=${encodeURIComponent(
													tag
												)}`}
											>
												<a className="movie-tag">
													{tag}
												</a>
											</Link>
										))}
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
			{isClicked || (
				<h3 className="info-button btn">Click for more info</h3>
			)}
		</article>
	);
};

export default MovieDetials;
