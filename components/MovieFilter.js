import { useState } from "react";
import { useRouter } from "next/router";
import { format_url, format_query } from "../util/route-functions";

const MovieFilter = () => {
	const router = useRouter();
	// const {
	// 	min_vote_average,
	// 	filter,
	// 	min_vote_count,
	// 	min_runtime,
	// 	num_per_page,
	// 	sort_type,
	// 	order
	// } = filterParams;
	const defaultFormState = {
		filter: { value: "", valid: true },
		min_vote_count: { value: 1000, valid: true },
		min_vote_average: { value: 7, valid: true },
		min_runtime: { value: 40, valid: true },
		num_per_page: { value: 30, valid: true },
		sort_type: { value: "recommended", valid: true },
		order: { value: -1, valid: true }
	};
	const [formState, setFormState] = useState(defaultFormState);
	// const [response, setResponse] = useState({ msg: "", errors: [] });
	const handleChange = (e, v) => {
		const formEl = e.target;
		const name = formEl.name;
		const value = formEl.value;
		let valid = false;
		switch (name) {
			// case "min_vote_count":
			// 	formEl.setCustomValidity("");
			// 	if (value >= 1) valid = true;
			// 	valid
			// 		? formEl.setCustomValidity("")
			// 		: formEl.setCustomValidity("Must have atleast 1 vote");
			// 	break;

			default:
				valid = true;
				break;
		}

		setFormState({
			...formState,
			[name]: { value, valid }
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = format_url(router.asPath);
		const query = format_query(formState);

		// let validForm =
		// 	formState.name.valid &&
		// 	formState.email.valid &&
		// 	formState.subject.valid &&
		// 	formState.message.valid;

		if (e.target.checkValidity()) {
			router.push({ pathname: url, query });
		}
		// 	try {
		// 		let form_data = {
		// 			name: formState.name.value,
		// 			email: formState.email.value,
		// 			subject: formState.subject.value,
		// 			message: formState.message.value
		// 		};
		// 		axios
		// 			.post("/api/contact/sendEmail", form_data)
		// 			.then((res) => {
		// 				setFormState(defaultFormState);
		// 				setResponse({
		// 					msg: res.data.msg,
		// 					errors: []
		// 				});
		// 			})
		// 			.catch((err) => {
		// 				console.log(err.response);
		// 				const error_msg = err.response.data.msg;
		// 				const errors = err.response.data.errors;
		// 				let error_list = [];
		// 				if (errors.length !== 0) {
		// 					errors.forEach((error) => {
		// 						error_list.push(error);
		// 					});
		// 				}
		// 				setResponse({ msg: error_msg, errors: error_list });
		// 			});
		// 	} catch (err) {
		// 		console.error(err);
		// 		setResponse({
		// 			msg:
		// 				"There was an error sending the form. Please make sure you are connected to the internet or contact me directly at mitchellvictoriano@gmail.com",
		// 			errors: []
		// 		});
		// 	}
		// }
	};
	return (
		<form id="filter_search" onSubmit={handleSubmit}>
			<fieldset className="form-items">
				<div className="form-group">
					<label htmlFor="filter">Tag</label>
					<input
						type="text"
						id="filter"
						name="filter"
						autoComplete="off"
						placeholder='e.g. "coming of age"'
						value={formState.filter.value}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="sort_type">Sort by</label>
					<select
						name="sort_type"
						value={formState.sort_type.value}
						onChange={handleChange}
					>
						<option value="recommended">Recommended</option>
						<option value="runtime">Runtime</option>
						<option value="movie_rating">Rating</option>
						<option value="votes"># of Votes</option>
						<option value="release_date">Release Date</option>
						{router.route.includes("personal") &&
							router.isReady && (
								<option value="user_rating">User Rating</option>
							)}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="min_vote_average">Min Rating</label>
					<input
						type="number"
						id="min_vote_average"
						name="min_vote_average"
						autoComplete="off"
						step={0.5}
						placeholder={"0.5 to 10"}
						min={0.5}
						max={10}
						value={formState.min_vote_average.value}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="min_vote_count">Min # Votes</label>
					<input
						type="number"
						id="min_vote_count"
						name="min_vote_count"
						autoComplete="off"
						// placeholder={"defaultFormState.min_vote_count.value"}
						min={1}
						value={formState.min_vote_count.value}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="min_runtime">Min Runtime (mins)</label>
					<input
						type="number"
						id="min_runtime"
						name="min_runtime"
						autoComplete="off"
						placeholder={"In Minutes"}
						min={1}
						value={formState.min_runtime.value}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="order">Order</label>
					<select
						name="order"
						value={formState.order.value}
						onChange={handleChange}
					>
						<option value={-1}>Descending</option>
						<option value={1}>Ascending</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="num_per_page">Results per Page</label>
					<select
						name="num_per_page"
						value={formState.num_per_page.value}
						onChange={handleChange}
					>
						<option value={30}>30</option>
						<option value={60}>60</option>
						<option value={90}>90</option>
						<option value={120}>120</option>
					</select>
				</div>
				<button className=" filter-btn" type="submit">
					Filter
				</button>
			</fieldset>
		</form>
	);
};

export default MovieFilter;
