import _ from 'lodash';
import { APIClient } from './APIClient';

export class EventsAPI {
	#url = '/events';
	#apiClient;
	constructor (params = {}) {
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken,
		});
	}

	async getAll ({ sorting = [] }) {
		const params = new URLSearchParams();

		if (_.some(sorting)) {
			params.set('sortBy', sorting[0].id);
			params.set('sortDir', sorting[0].desc ? 'desc' : 'asc');
		}

		return await this.#apiClient.get({
			url: `${this.#url}?${params.toString()}`,
		});
	}

	async getTodays () {
		return await this.#apiClient.get({
			url: `${this.#url}/today`,
		});
	}

	async create ({ name, startDateTime, participantCapacity, status }) {
		return await this.#apiClient.post({
			url: this.#url,
			body: {
				name,
				startDateTime,
				participantCapacity,
				status,
			},
		});
	}
}