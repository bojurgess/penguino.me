export interface FetchOptions {
	url: string;
	headers?: any;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: any;
	query?: URLSearchParams;
}
