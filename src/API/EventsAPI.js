import _ from 'lodash';
import { APIClient } from './APIClient';
import dayjs from 'dayjs';

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

		const events = await this.#apiClient.get({
			url: `${this.#url}?${params.toString()}`,
		});

		return _.map(events, (event) => ({
			id: event.id,
			name: event.name,
			participantCapacity: event.participantCapacity,
			status: event.status,
			date: dayjs(event.startDateTime).format('MMM DD, YYYY'),
			startTime: dayjs(event.startDateTime).format('hh:mm a'),
			startDateTime: dayjs(event.startDateTime),
		}));
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

	async delete ({ eventId }) {
		return await this.#apiClient.delete({
			url: `${this.#url}/${eventId}`,
		});
	}

	async update ({ id, name, startDateTime, participantCapacity, status }) {
		return await this.#apiClient.patch({
			url: `${this.#url}/${id}`,
			body: {
				name,
				startDateTime,
				participantCapacity,
				status,
			},
		});
	}
}