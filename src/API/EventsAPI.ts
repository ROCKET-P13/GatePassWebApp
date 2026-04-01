import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';

import { Event } from '@/types/Event';
import { EventClass } from '@/types/EventClass';
import { EventRegistration } from '@/types/EventRegistration';

import { APIClient } from './APIClient';

interface EventsAPIConstructorParams {
	getAccessToken?: () => Promise<string>;
	apiClient?: APIClient;
}

interface RawEvent {
	id: string;
	name: string;
	participantCapacity?: number;
	status: string;
	startDateTime: Dayjs;
}

interface GetAllParams {
	sorting?: Array<{ id: string; desc: boolean }>;
}

interface GetRegistrationsParams {
	eventId: string;
}

interface GetCheckinsParams {
	eventId: string;
}

interface RegisterParticipantParams {
	eventId: string;
	participantId: string;
	eventNumber: string;
	eventClass: string;
	checkedIn: boolean;
}

interface AddClassParams {
	eventId: string;
	name: string;
	gender?: string;
	skillLevel?: string;
	maximumAge?: number;
	minimumAge?: number;
	participantCapacity?: number;
}

interface CreateEventParams {
	name: string;
	startDateTime: Dayjs;
	participantCapacity?: number | null;
	status: string;
}

interface DeleteEventParams {
	eventId: string;
}

interface UpdateEventParams {
	id: string;
	name: string;
	startDateTime: Dayjs;
	participantCapacity?: number;
	status: string;
}

interface CheckinParticipantParams {
	eventId: string;
	participantId: string;
}

export class EventsAPI {
	#url = '/events';
	#apiClient: APIClient;

	constructor (params: EventsAPIConstructorParams = {}) {
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken!,
		});
	}

	async getById (eventId: string): Promise<Event> {
		const event = await this.#apiClient.get({
			url: `${this.#url}/${eventId}`,
		}) as RawEvent;

		return {
			id: event.id,
			name: event.name,
			participantCapacity: event.participantCapacity,
			status: event.status,
			date: dayjs(event.startDateTime).format('MMM DD, YYYY'),
			startTime: dayjs(event.startDateTime).format('hh:mm a'),
			startDateTime: dayjs(event.startDateTime),
		};
	}

	async getAll ({ sorting = [] }: GetAllParams): Promise<Event[]> {
		const params = new URLSearchParams();

		if (_.some(sorting)) {
			params.set('sortBy', sorting[0].id);
			params.set('sortDir', sorting[0].desc ? 'desc' : 'asc');
		}

		const events = await this.#apiClient.get({
			url: `${this.#url}?${params.toString()}`,
		}) as RawEvent[];

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

	async getTodays (): Promise<Event[]> {
		const events = await this.#apiClient.get({
			url: `${this.#url}/today`,
		}) as RawEvent[];

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

	async getRegistrations ({ eventId }: GetRegistrationsParams): Promise<EventRegistration[]> {
		const registrations = await this.#apiClient.get({
			url: `${this.#url}/${eventId}/registrations`,
		}) as EventRegistration[];

		return registrations;
	}

	async getCheckins ({ eventId }: GetCheckinsParams): Promise<EventRegistration[]> {
		return await this.#apiClient.get({
			url: `${this.#url}/${eventId}/checkins`,
		}) as EventRegistration[];
	}

	async checkinParticipant ({ eventId, participantId }: CheckinParticipantParams): Promise<EventRegistration> {
		return await this.#apiClient.post({
			url: `${this.#url}/${eventId}/checkins`,
			body: {
				participantId,
				eventId,
			},
		}) as EventRegistration;
	}

	async registerParticipant ({ eventId, participantId, eventNumber, eventClass, checkedIn }: RegisterParticipantParams): Promise<EventRegistration> {
		const registration = await this.#apiClient.post({
			url: `${this.#url}/${eventId}/registrations`,
			body: {
				class: eventClass,
				eventId,
				participantId,
				eventNumber,
				checkedIn,
			},
		}) as EventRegistration;

		return registration;
	}

	async addClass ({ eventId, name, gender, skillLevel, maximumAge, minimumAge, participantCapacity }: AddClassParams): Promise<EventClass> {
		return await this.#apiClient.post({
			url: `${this.#url}/${eventId}/classes`,
			body: {
				name,
				gender,
				skillLevel,
				maximumAge,
				minimumAge,
				participantCapacity,
			},
		}) as EventClass;
	}

	async create ({ name, startDateTime, participantCapacity, status }: CreateEventParams): Promise<Event> {
		const event = await this.#apiClient.post({
			url: this.#url,
			body: {
				name,
				startDateTime,
				participantCapacity,
				status,
			},
		}) as RawEvent;

		return {
			id: event.id,
			name: event.name,
			participantCapacity: event.participantCapacity,
			status: event.status,
			date: dayjs(event.startDateTime).format('MMM DD, YYYY'),
			startTime: dayjs(event.startDateTime).format('hh:mm a'),
			startDateTime: dayjs(event.startDateTime),
		};
	}

	async delete ({ eventId }: DeleteEventParams): Promise<void> {
		await this.#apiClient.delete({
			url: `${this.#url}/${eventId}`,
		});
	}

	async getClasses ({ eventId }: { eventId: string }): Promise<EventClass[]> {
		return await this.#apiClient.get({
			url: `${this.#url}/${eventId}/classes`,
		}) as EventClass[];
	}

	async update ({ id, name, startDateTime, participantCapacity, status }: UpdateEventParams): Promise<Event> {
		return await this.#apiClient.patch({
			url: `${this.#url}/${id}`,
			body: {
				name,
				startDateTime,
				participantCapacity,
				status,
			},
		}) as Event;
	}
}
