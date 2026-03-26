import dayjs from 'dayjs';
import _ from 'lodash';

import { Participant } from '@/types/Participant';
import { ParticipantRegistration } from '@/types/ParticipantRegistration';

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

interface ParticipantRegistrationViewModelProps {
	id: string;
	type: string;
	eventNumber: number;
	eventName: string;
	eventId: string;
	eventDate: string;
	createdAt: string;
	checkedInAt: string | null;
	checkedIn: boolean;
	date: string;
}

export class ParticipantsAPI {
	#url = '/participants';
	#apiClient: APIClient;

	constructor (params: ParticipantsAPIConstructorParams = {}) {
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken!,
		});
	}

	async getRegistrations ({ participantId } : { participantId: string }) : Promise<ParticipantRegistration[]> {
		const registrations = await this.#apiClient.get({
			url: `${this.#url}/${participantId}/registrations`,
		}) as ParticipantRegistrationViewModelProps[];

		return _.map(registrations, (registration) => ({
			id: registration.id,
			eventId: registration.eventId,
			eventName: registration.eventName,
			eventDate: dayjs(registration.eventDate).format('MMM DD, YYYY'),
			eventNumber: registration.eventNumber,
			checkedIn: registration.checkedIn,
			checkedInAt: dayjs(registration.checkedInAt).format('MMM DD, YYYY'),
			type: registration.type,
			date: dayjs(registration.date).format('MMM DD, YYYY'),
		}));
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
