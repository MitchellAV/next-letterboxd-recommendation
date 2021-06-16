export interface Movie {
	_id: number;
	letterboxd_id?: null;
	letterboxd_url?: null;
	keywords: string[];
	tags: string[];
	genres: string[];
	cast: string[];
	crew: string[];
	directors?: string[] | null;
	producers?: string[] | null;
	writers?: null[] | null;
	dp?: string[] | null;
	screenplay?: string[] | null;
	overview_words?: string[] | null;
	production_countries?: string[] | null;
	production_companies?: string[] | null;
	spoken_languages?: string[] | null;
	title?: string;
	vote_count?: number;
	vote_average?: number;
	release_date?: string;
	runtime?: number;
	revenue?: number;
	overview?: string;
	original_title?: string;
	original_language?: string;
	imdb_id?: string;
	budget?: number;
	adult?: boolean;
	thumbnail_url?: string;
	score?: number | null;
	createdAt: CreatedAtOrUpdatedAt;
	updatedAt: CreatedAtOrUpdatedAt;
	filter?: string[] | null;
	adjusted_rating?: number;
	maxTag?: string | null;
	userRating?: number | null;
}

export interface CreatedAtOrUpdatedAt {
	$date: string;
}

export interface Response {
	message: string;
	status: number;
}

export interface FilterParams {
	min_vote_average: number;
	filter: string;
	min_vote_count: number;
	min_runtime: number;
	num_per_page: number;
	sort_type: string;
	order: 1 | -1;
}
