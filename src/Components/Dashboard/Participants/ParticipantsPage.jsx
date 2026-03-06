import { ParticipantsTable } from './ParticipantsTable';
import { ParticipantsFilter } from './ParticipantsFilters';

export const ParticipantsPage = () => {
	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold tracking-tight">
					Participants
				</h1>

				<ParticipantsFilter />
			</div>
			<ParticipantsTable participants={[]} />
		</div>
	);
};