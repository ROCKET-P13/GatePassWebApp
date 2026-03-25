import { Venue } from '@/types/Venue';

import { APIClient } from './APIClient';

interface UsersAPIConstructorParams {
	getAccessToken?: () => Promise<string>;
	apiClient?: APIClient;
}

export class UsersAPI {
	#url = '/users';
	#apiClient: APIClient;

	constructor (params: UsersAPIConstructorParams = {}) {
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken!,
		});
	}

	async getVenue (): Promise<Venue> {
		return await this.#apiClient.get({
			url: `${this.#url}/venue`,
		}) as Venue;
	}
}
