import { APIClient } from './APIClient';

interface VenuesAPIConstructorParams {
	getAccessToken?: () => Promise<string>;
	apiClient?: APIClient;
}

interface CreateVenueParams {
	name: string;
	email: string;
	addressLine1: string;
	addressLine2?: string;
	phoneNumber: string;
	city: string;
	state: string;
	logoImageUrl?: string;
	country: string;
}

export class VenuesAPI {
	#url = '/venues';
	#apiClient: APIClient;
	
	constructor (params: VenuesAPIConstructorParams = {}) {
		this.#apiClient = params.apiClient ?? new APIClient({
			getAccessToken: params.getAccessToken!,
		});
	}

	async create ({ name, email, addressLine1, addressLine2, phoneNumber, city, state, logoImageUrl, country }: CreateVenueParams): Promise<unknown> {
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
