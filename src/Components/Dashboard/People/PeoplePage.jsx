import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold tracking-tight">
					People
				</h1>

				<PeopleFilters />
			</div>
			<PeopleTable people={[]} />
		</div>
	);
};