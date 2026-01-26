import _ from 'lodash';
import { APIClient } from './APIClient';

export class EventsAPI {
	#apiClient;
	constructor (params = {}) {
		this.#apiClient = params.apiClient ?? new APIClient();
	}

	async getEvents ({ sorting = [] }) {
		const params = new URLSearchParams();

		if (_.some(sorting)) {
			params.set('sortBy', sorting[0].id);
			params.set('sortDir', sorting[0].desc ? 'desc' : 'asc');
		}

		return await this.#apiClient.get({
			url: `/events?${params.toString()}`,
		});
	}
}