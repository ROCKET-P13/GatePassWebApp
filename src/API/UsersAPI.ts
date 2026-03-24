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

	async getCurrent (): Promise<unknown> {
		return await this.#apiClient.get({
			url: `${this.#url}/me`,
		});
	}

	async getVenue (): Promise<{ name: string; city: string; state: string; country: string }> {
		return await this.#apiClient.get({
			url: `${this.#url}/venue`,
		}) as { name: string; city: string; state: string; country: string };
	}
}
