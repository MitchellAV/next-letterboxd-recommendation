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
		score
	} = movie;
	console.log(score);
	return (
		<article
			className="movie-container"
			onClick={() => setIsClicked(!isClicked)}
		>
			<h2 className="movie-title">{title}</h2>
			<div className="movie-info">
				<a
					className="movie-link"
					target="_blank"
					href={`https://letterboxd.com/tmdb/${_id}`}
				>
					<img
						src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/thumbnails/${_id}-thumb.jpg`}
						className="movie-thumb"
						loading="lazy"
						alt={title}
					/>
				</a>
				<div className="movie-links">
					<Link href={`/movie/${_id}`}>
						<a className="movie-link">Similar Movies</a>
					</Link>

					<a
						className="movie-link"
						target="_blank"
						href={`https://letterboxd.com/tmdb/${_id}`}
					>
						View on Letterboxd
					</a>
					{imdb_id && (
						<a
							className="movie-link"
							target="_blank"
							href={`https://www.imdb.com/title/${imdb_id}`}
						>
							View on IMDb
						</a>
					)}
				</div>
				{score && (
					<div className="movie-info-group">
						<h5 className="movie-info-heading">Profile Match:</h5>
						<p>{(score * 100).toFixed(1) + "%"}</p>
					</div>
				)}
				{maxTag && (
					<>
						<div className="movie-info-group">
							<h5 className="movie-info-heading">
								Recommended because of Tag:{" "}
							</h5>
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
				{isClicked && (
					<>
						{original_title !== title && (
							<div className="movie-info-group">
								<h5 className="movie-info-heading">
									Original Title:
								</h5>
								<p>{original_title}</p>
							</div>
						)}

						<div className="movie-info-summary">
							<h5 className="movie-info-heading">Synopsis:</h5>
							<p>{overview}</p>
						</div>

						{userRating && (
							<div className="movie-info-group">
								<h5 className="movie-info-heading">
									User Rating:
								</h5>
								<p>{userRating.toFixed(1)}</p>
							</div>
						)}
						<div className="movie-info-group">
							<h5 className="movie-info-heading">Avg. Rating:</h5>
							<p>{vote_average}</p>
						</div>
						<div className="movie-info-group">
							<h5 className="movie-info-heading"># of Votes:</h5>
							<p>{vote_count}</p>
						</div>
						<div className="movie-info-group">
							<h5 className="movie-info-heading">
								Release Date:
							</h5>
							<p>{release_date}</p>
						</div>
						<div className="movie-info-group">
							<h5 className="movie-info-heading">Runtime:</h5>
							<p>{runtime} mins.</p>
						</div>

						{cast.length !== 0 && (
							<>
								<div className="movie-info-group">
									<h5 className="movie-info-heading">
										Cast:
									</h5>

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
								</div>
							</>
						)}
						{crew.length !== 0 && (
							<>
								<div className="movie-info-group">
									<h5 className="movie-info-heading">
										Crew:
									</h5>

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
								</div>
							</>
						)}

						{genres.length !== 0 && (
							<>
								<div className="movie-info-group">
									<h5 className="movie-info-heading">
										Genres:
									</h5>

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
								</div>
							</>
						)}
						{keywords.length !== 0 && (
							<>
								<div className="movie-info-group">
									<h5 className="movie-info-heading">
										Keywords:
									</h5>

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
								</div>
							</>
						)}
					</>
				)}
			</div>

			{isClicked ? (
				<h5 className="info-button btn">Click for less info</h5>
			) : (
				<h5 className="info-button btn">Click for more info</h5>
			)}
		</article>
	);
};

export default MovieDetials;
