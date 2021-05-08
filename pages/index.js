import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Letterboxd Movie Recommendation</title>
			</Head>

			<h1>Welcome to the Home Page</h1>
			<form
				id="create_user"
				action="http://localhost:8080/api/update"
				method="POST"
			>
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
							name="username"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="accuracy">
							How long do you want to wait?
						</label>
						<select name="accuracy">
							<option value="low">I need it right now</option>
							<option value="med">Take your time</option>
							<option value="high">I have all day</option>
						</select>
					</div>
					<button className="filter-btn" type="submit">
						Get Recommendations
					</button>
				</fieldset>
			</form>
		</>
	);
}
