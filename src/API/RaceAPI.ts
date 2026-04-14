import { APIClient } from '@/API/APIClient';
import { Moto } from '@/types/Moto';

interface RaceAPIConstructorParams {
	getAccessToken?: () => Promise<string>;
	apiClient?: APIClient;
	eventId: string;
}

interface CreateMotosParams {
	eventClassId: string;
	gateSize?: number;
}

interface GetMotosByClassId {
	eventClassId: string;
}

export class RaceAPI {
	#eventId: string;
	#url: string;
	#apiClient: APIClient;

	constructor (params: RaceAPIConstructorParams) {
		this.#eventId = params.eventId;
		this.#url = `/events/${this.#eventId}/race`;
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken!,
		});
	}

	async createMotos ({ eventClassId, gateSize }: CreateMotosParams) {
		const motos = await this.#apiClient.post({
			url: `${this.#url}/classes/${eventClassId}/motos/generate`,
			body: {
				gateSize,
			},
		}) as Moto[];

		return motos;
	}

	async getMotosByClassId ({ eventClassId }: GetMotosByClassId) {
		const motos = await this.#apiClient.get({
			url: `${this.#url}/classes/${eventClassId}`,
		});

		return motos;
	}
}