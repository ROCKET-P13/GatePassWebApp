import dayjs from 'dayjs';
import _ from 'lodash';

import { Participant } from '@/types/Participant';

import { APIClient } from './APIClient';

interface ParticipantsAPIConstructorParams {
	getAccessToken?: () => Promise<string>;
	apiClient?: APIClient;
}

interface RawParticipant {
	id: string;
	firstName: string;
	lastName: string;
	createdAt: string;
}

interface CreateParticipantParams {
	firstName: string;
	lastName: string;
}

export class ParticipantsAPI {
	#url = '/participants';
	#apiClient: APIClient;

	constructor (params: ParticipantsAPIConstructorParams = {}) {
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken!,
		});
	}

	async getAll (): Promise<Participant[]> {
		const participants = await this.#apiClient.get({
			url: `${this.#url}`,
		}) as RawParticipant[];

		return _.map(participants, (participant) => ({
			id: participant.id,
			firstName: participant.firstName,
			lastName: participant.lastName,
			createdAt: dayjs(participant.createdAt).format('MMM DD, YYYY'),
		}));
	}

	async getById (participantId: string): Promise<Participant> {
		const participant = await this.#apiClient.get({
			url: `${this.#url}/${participantId}`,
		}) as RawParticipant;

		return {
			id: participant.id,
			firstName: participant.firstName,
			lastName: participant.lastName,
			createdAt: dayjs(participant.createdAt).format('MMM DD, YYYY'),
		};
	}

	async create ({ firstName, lastName }: CreateParticipantParams): Promise<Participant> {
		const participant = await this.#apiClient.post({
			url: this.#url,
			body: {
				firstName,
				lastName,
			},
		}) as RawParticipant;

		return {
			id: participant.id,
			firstName: participant.firstName,
			lastName: participant.lastName,
			createdAt: dayjs(participant.createdAt).format('MMM DD, YYYY'),
		};
	}
}
