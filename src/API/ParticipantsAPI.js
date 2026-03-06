import { APIClient } from './APIClient';

export class ParticipantsAPI {
	#url = '/participants';
	#apiClient;

	constructor (params = {}) {
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken,
		});
	}

	async getAll () {
		const participants = await this.#apiClient.get({
			url: `${this.#url}`,
		});

		return participants;
	}

	async create ({ firstName, lastName }) {
		return await this.#apiClient.post({
			url: this.#url,
			body: {
				firstName,
				lastName,
			},
		});
	}
}