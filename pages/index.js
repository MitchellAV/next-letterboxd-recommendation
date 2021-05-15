import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import Status from "../components/Status";

export default function Home() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [userMovieStatus, setUserMovieStatus] = useState("waiting");
	const [userRecStatus, setUserRecStatus] = useState("waiting");
	const handleChange = (e) => {
		setUsername(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setUserMovieStatus("waiting");
		setUserRecStatus("waiting");
		try {
			setUserMovieStatus("working");
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_REC_API_ENDPOINT}/user/movies`,
				{
					username
				},
				{ timeout: 1000 * 60 * 5 }
			);
			const data = res.data;
			if (data.status === 200) {
				setUserMovieStatus("success");
			} else {
				setUserMovieStatus("failed");
			}
		} catch (err) {
			setUserMovieStatus("failed");
			console.log(err);
			return;
		}
		try {
			setUserRecStatus("working");
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_REC_API_ENDPOINT}/user/recommend`,
				{
					username
				},
				{ timeout: 1000 * 60 * 5 }
			);
			const data = res.data;
			if (data.status === 200) {
				setUserRecStatus("success");
			} else {
				setUserMovieStatus("failed");
			}
		} catch (err) {
			setUserRecStatus("failed");
			console.log(err);
			return;
		}
		setTimeout(() => {
			router.push(`/user/${username}`);
		}, 3000);
	};
	return (
		<>
			<Head>
				<title>Letterboxd Movie Recommendation</title>
			</Head>

			<h1>Welcome to the Home Page</h1>
			<form id="create_user" onSubmit={handleSubmit}>
				<fieldset className="form-items">
					<div className="form-group">
						<label htmlFor="username">
							Enter your Letterboxd Username for custom
							recommendations
						</label>
						<input
							type="text"
							autoComplete="off"
							placeholder="Letterboxd Username"
							id="username"
							name="username"
							value={username}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="accuracy">
							How long do you want to wait?
						</label>
						{/* <select name="accuracy">
							<option value="low">I need it right now</option>
							<option value="med">Take your time</option>
							<option value="high">I have all day</option>
						</select> */}
					</div>
					<button className="filter-btn" type="submit">
						Get Recommendations
					</button>
				</fieldset>
			</form>
			{isLoading && (
				<section className="status-container">
					<Status
						state={userMovieStatus}
						statusText={
							"Getting your watched movies from Letterboxd"
						}
					/>
					<Status
						state={userRecStatus}
						statusText={
							"Creating your personal movie recommendations"
						}
					/>
					{userMovieStatus === "success" &&
						userRecStatus === "success" && (
							<h2>
								Recommendations are ready... Taking you there
								now
							</h2>
						)}
				</section>
			)}
		</>
	);
}
