export interface Venue {
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