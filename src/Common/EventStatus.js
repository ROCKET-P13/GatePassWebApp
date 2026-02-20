export const EventStatus = Object.freeze({
	DRAFT: 'Draft',
	SCHEDULED: 'Scheduled',
	OPEN: 'Open',
	CLOSED: 'Closed',
	COMPLETED: 'Completed',
	CANCELLED: 'Cancelled',
});

export const EventStatusColorClass = Object.freeze({
	[EventStatus.DRAFT]: 'default',
	[EventStatus.SCHEDULED]: 'default',
	[EventStatus.OPEN]: 'success',
	[EventStatus.CLOSED]: 'default',
	[EventStatus.COMPLETED]: 'default',
	[EventStatus.CANCELLED]: 'default',
});