import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { format_url } from "../util/route-functions";
import { FilterParams } from "../types";
export interface MovieFilterProps {
	filterParams: FilterParams;
}

const MovieFilter = ({ filterParams }: MovieFilterProps) => {
	const router = useRouter();
	const {
		min_vote_average,
		filter,
		min_vote_count,
		min_runtime,
		num_per_page,
		sort_type,
		order
	} = filterParams;
	const defaultFormState = {
		filter: filter,
		min_vote_count: min_vote_count,
		min_vote_average: min_vote_average,
		min_runtime: min_runtime,
		num_per_page: num_per_page,
		sort_type: sort_type,
		order: order
	};
	const [formState, setFormState] = useState(defaultFormState);
	const formRef = useRef<HTMLFormElement>(null!);

	const handleChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLSelectElement
	> = (e) => {
		const formEl = e.target;
		const name = formEl.name;
		const value = formEl.value;

		setFormState({
			...formState,
			[name]: value
		});
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const url = format_url(router.asPath);
		console.log(this);

		if (formRef.current.checkValidity()) {
			router.push({ pathname: url, query: formState });
		}
	};
	return (
		<form id="filter_search" ref={formRef} onSubmit={handleSubmit}>
			<fieldset className="form-items">
				<div className="form-group">
					<label htmlFor="filter">Tag</label>
					<input
						type="text"
						id="filter"
						name="filter"
						autoComplete="off"
						placeholder='e.g. "coming of age"'
						value={formState.filter}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="sort_type">Sort by</label>
					<select
						name="sort_type"
						value={formState.sort_type}
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
						value={formState.min_vote_average}
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
						// placeholder={"defaultFormState.min_vote_count"}
						min={1}
						value={formState.min_vote_count}
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
						value={formState.min_runtime}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="order">Order</label>
					<select
						name="order"
						value={formState.order}
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
						value={formState.num_per_page}
						onChange={handleChange}
					>
						<option value={30}>30</option>
						<option value={60}>60</option>
						<option value={90}>90</option>
						<option value={120}>120</option>
					</select>
				</div>
				<button className="btn filter-btn" type="submit">
					Filter
				</button>
			</fieldset>
		</form>
	);
};

export default MovieFilter;
