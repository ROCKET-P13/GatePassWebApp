import dayjs from 'dayjs';
import _ from 'lodash';

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

		return _.map(participants, (participant) => ({
			id: participant.id,
			firstName: participant.firstName,
			lastName: participant.lastName,
			createdAt: dayjs(participant.createdAt).format('MMM DD, YYYY'),
		}));
	}

	async getById (participantId) {
		const participant = await this.#apiClient.get({
			url: `${this.#url}/${participantId}`,
		});

		return {
			id: participant.id,
			firstName: participant.firstName,
			lastName: participant.lastName,
			createdAt: dayjs(participant.createdAt).format('MMM DD, YYYY'),
		};
	}

	async create ({ firstName, lastName }) {
		const participant = await this.#apiClient.post({
			url: this.#url,
			body: {
				firstName,
				lastName,
			},
		});

		return {
			id: participant.id,
			firstName: participant.firstName,
			lastName: participant.lastName,
			createdAt: dayjs(participant.createdAt).format('MMM DD, YYYY'),
		};
	}
}