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
			<div>
				<h2 className="movie-title">{title}</h2>

				<img
					src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/thumbnails/${_id}-thumb.jpg`}
					className="movie-thumb"
					loading="lazy"
					alt={_id}
				/>
			</div>

			<div className="movie-info">
				<p>
					<Link href={`/movie/${_id}`}>
						<a className="movie-tag">Recommend Similar Movies</a>
					</Link>
				</p>

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
				{imdb_id && (
					<p>
						<a
							className="movie-tag"
							target="_blank"
							href={`https://www.imdb.com/title/${imdb_id}`}
						>
							View on IMDb
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
						<b>User Rating: </b>
						{userRating}
					</p>
				)}
				<p>
					<b>Original Title: </b>
					{original_title}
				</p>
				<p>
					<b>Runtime: </b>
					{runtime} mins.
				</p>

				<p>
					<b>Avg. Rating: </b>
					{vote_average}
				</p>
				<p>
					<b># of Ratings: </b>
					{vote_count}
				</p>
				<p>
					<b>Release Date: </b>
					{release_date}
				</p>
				<p>
					<b>Summary: </b>
					{overview}
				</p>
				{isClicked ? (
					<>
						{crew.length !== 0 && (
							<>
								<p>
									<b>Crew: </b>
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
									<b>Cast: </b>
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
									<b>Keywords: </b>
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
									<b>Genres: </b>
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
					</>
				) : (
					<h4 className="info-button btn">Click for more info</h4>
				)}
			</div>
		</article>
	);
};

export default MovieDetials;
