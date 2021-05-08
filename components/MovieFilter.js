import { useState } from "react";
import { useRouter } from "next/router";
import { format_url, format_query } from "../util/route-functions";

const MovieFilter = ({ queryParams, setQueryParams }) => {
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
		min_vote_count: { value: 100, valid: true },
		min_vote_average: { value: 5, valid: true },
		min_runtime: { value: 40, valid: true },
		num_per_page: { value: 25, valid: true },
		sort_type: { value: "score.score", valid: true },
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
			// case "min_vote_average":
			// 	formEl.setCustomValidity("");
			// 	if (value >= 3) valid = true;
			// 	valid
			// 		? formEl.setCustomValidity("")
			// 		: formEl.setCustomValidity("Please enter in your name");
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

		router.push({ pathname: url, query });

		// let validForm =
		// 	formState.name.valid &&
		// 	formState.email.valid &&
		// 	formState.subject.valid &&
		// 	formState.message.valid;

		// if (e.target.checkValidity() && validForm) {
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
			<h4>Filter Results</h4>
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
						<option value="score.score">Recommended</option>
						<option value="runtime">Runtime</option>
						<option value="vote_average">Rating</option>
						<option value="vote_count"># of Votes</option>
						<option value="release_date">Release Date</option>
						{/* <% if (personal) { %>
						<option value="score.userRating">User Rating</option>
						<% } %> */}
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
						placeholder={defaultFormState.min_vote_average.value}
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
						placeholder={defaultFormState.min_vote_count.value}
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
						placeholder={defaultFormState.min_runtime.value}
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
						<option value={25}>25</option>
						<option value={50}>50</option>
						<option value={75}>75</option>
						<option value={100}>100</option>
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