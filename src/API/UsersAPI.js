import { APIClient } from './APIClient';

export class UsersAPI {
	#url = '/users';
	#apiClient;
	constructor (params = {}) {
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken,
		});
	}

	async getCurrent () {
		return await this.#apiClient.get({
			url: `${this.#url}/me`,
		});
	}
}