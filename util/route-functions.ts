export const sort_order = (sort_type: string, order: 1 | -1) => {
	let sort_by;
	if (sort_type !== "score.score") {
		sort_by = { [sort_type]: order, "score.score": -1 };
	} else {
		sort_by = { [sort_type]: order };
	}
	return sort_by;
};

// export const filter_params = (req) => {
// 	const default_min_vote_count = 100;
// 	const default_min_vote_average = 6;
// 	const default_min_runtime = 40;
// 	const default_num_per_page = 25;
// 	const default_sort_type = "score.score";
// 	const default_order = -1;

// 	let filter = req.query.filter;
// 	let min_vote_count =
// 		parseInt(req.query.min_vote_count) || default_min_vote_count;
// 	let min_vote_average =
// 		parseFloat(req.query.min_vote_average) || default_min_vote_average;
// 	let min_runtime = parseInt(req.query.min_runtime) || default_min_runtime;
// 	let page = parseInt(req.query.page) || 0;
// 	let num_per_page = parseInt(req.query.num_per_page) || default_num_per_page;
// 	let sort_type = req.query.sort_type || default_sort_type;
// 	let order = parseInt(req.query.order) || default_order;

// 	return {
// 		filter,
// 		min_vote_count,
// 		min_vote_average,
// 		min_runtime,
// 		page,
// 		num_per_page,
// 		sort_type,
// 		order
// 	};
// };

export const format_url = (asPath: string) => {
	return asPath.indexOf("?") !== -1
		? asPath.slice(0, asPath.indexOf("?"))
		: asPath;
};
// export const format_query = (formState: object) => {
// 	const query: object = {};

// 	for (const key in formState) {
// 		query[key] = formState[key].value;
// 	}
// 	return query;
// };
