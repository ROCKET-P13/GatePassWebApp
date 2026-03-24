import axios, { AxiosError } from 'axios';

interface APIClientConstructorParams {
	getAccessToken: () => Promise<string>;
}

interface RequestParams {
	method: string;
	url: string;
	body?: unknown;
	headers?: Record<string, string>;
}

interface GetParams {
	url: string;
}

interface PostParams {
	url: string;
	body: unknown;
}

interface DeleteParams {
	url: string;
}

interface PatchParams {
	url: string;
	body: unknown;
}

interface APIError {
	status: number;
	message: string;
}

export class APIClient {
	#API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';
	#getAccessToken: () => Promise<string>;

	constructor (params: APIClientConstructorParams) {
		this.#getAccessToken = params.getAccessToken;
	}

	async #request (params: RequestParams): Promise<unknown> {
		try {
			const token = await this.#getAccessToken();
			const response = await axios.request({
				method: params.method,
				url: `${this.#API_BASE_URL}${params.url}`,
				data: params.body,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					...(params.headers || {}),
				},
				withCredentials: true,
			});

			return response.data;
		} catch (error) {
			const axiosError = error as AxiosError<{ message?: string }>;
			
			if (axiosError.response) {
				const apiError: APIError = {
					status: axiosError.response.status,
					message: axiosError.response.data?.message || 'API Error',
				};
				throw apiError;
			}

			const networkError: APIError = {
				status: 0,
				message: axiosError.message || 'Network Error',
			};
			throw networkError;
		}
	}

	async get ({ url }: GetParams): Promise<unknown> {
		return await this.#request({
			method: 'GET',
			url,
		});
	}

	async post ({ url, body }: PostParams): Promise<unknown> {
		return await this.#request({
			method: 'POST',
			url,
			body,
		});
	}

	async delete ({ url }: DeleteParams): Promise<unknown> {
		return await this.#request({
			method: 'DELETE',
			url,
		});
	}

	async patch ({ url, body }: PatchParams): Promise<unknown> {
		return await this.#request({
			method: 'PATCH',
			url,
			body,
		});
	}
}
