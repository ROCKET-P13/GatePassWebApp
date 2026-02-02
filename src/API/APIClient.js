import axios from 'axios';

export class APIClient {
	#API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';
	#getAccessToken;

	constructor (params = {}) {
		this.#getAccessToken = params.getAccessToken;
	}

	async #request (params = {}) {
		try {
			const response = await axios.request({
				method: params.method,
				url: `${this.#API_BASE_URL}${params.url}`,
				data: params.body,
				headers: {
					'Content-Type': 'application/json',
					...(params.headers || {}),
				},
				withCredentials: true,
			});

			return response.data;
		} catch (error) {
			if (error.response) {
				throw {
					status: error.response.status,
					message: error.response.data?.message || 'API Error',
				};
			}

			throw {
				status: 0,
				message: error.message || 'Network Error',
			};
		}
	}

	async get ({ url }) {
		const token = await this.#getAccessToken();

		return await this.#request({
			method: 'GET',
			url,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	post ({ url, body }) {
		return this.#request(url, {
			method: 'POST',
			body: JSON.stringify(body),
		});
	}
}