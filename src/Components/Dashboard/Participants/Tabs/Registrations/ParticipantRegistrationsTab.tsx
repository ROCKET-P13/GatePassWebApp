interface ParticipantRegistrationsTableProps {
	participantId: string;
}

export const ParticipantRegistrationsTable = ({ participantId }: ParticipantRegistrationsTableProps) => {
	return (
		<div>{participantId}</div>
	);
};