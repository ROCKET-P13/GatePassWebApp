import { APIClient } from './APIClient';

export class VenuesAPI {
	#url = '/venues';
	#apiClient;
	constructor (params = {}) {
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken,
		});
	}

	async create ({ name, email, addressLine1, addressLine2, phoneNumber, city, state, logoImageUrl, country }) {
		return await this.#apiClient.post({
			url: this.#url,
			body: {
				name,
				email,
				addressLine1,
				addressLine2,
				phoneNumber,
				city,
				state,
				logoImageUrl,
				country,
			},
		});
	}
}