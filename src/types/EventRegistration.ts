export interface EventRegistration {
	id?: string;
	participantFirstName: string;
	participantLastName: string;
	participantId: string;
	class: string;
	eventNumber: string;
	checkedIn: boolean;
	eventClassName?: string;
}