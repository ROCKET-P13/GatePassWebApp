import _ from 'lodash';
import { useEffect } from 'react';

import { useGetAllEventClassesQuery } from '@/hooks/queries/useGetAllEventClassesQuery';
import { eventClassStore } from '@/stores/eventClassStore';
import { mergeTailwindClasses } from '@/utils/mergeTailwindClasses';

interface EventClassListProps {
	eventId: string;
}

export const EventClassList = ({ eventId }: EventClassListProps) => {
	const {
		data: eventClasses = [],
		isLoading: isEventClassesLoading,
		error,
	} = useGetAllEventClassesQuery({ eventId });
	const setSelectedEventClass = eventClassStore((state) => state.setSelectedClass);
	const selectedEventClass = eventClassStore((state) => state.selectedEventClass);

	useEffect(() => {
		if (_.isEmpty(selectedEventClass.id) && eventClasses.length > 0) {
			setSelectedEventClass(eventClasses[0]);
		}
	}, [selectedEventClass, eventClasses, setSelectedEventClass]);

	if (isEventClassesLoading) {
		return (
			<p className="text-sm text-muted-foreground">
				Loading...
			</p>
		);
	}

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Error
			</p>
		);
	}

	return (
		<div className='space-y-6 flex-row'>
			<div className='flex flex-row gap-2'>
				{
					eventClasses.map((eventClass) => {
						return (
							<button
								key={eventClass.id}
								onClick={() => setSelectedEventClass(eventClass)}
								className={
									mergeTailwindClasses(
										'w-full text-left rounded-xl border p-3 transition-all',
										'bg-card text-card-foreground',
										'hover:bg-accent hover:text-accent-foreground',
										eventClass.id == selectedEventClass?.id ? 'border-primary shadow-md' : 'border-border'
									)
								}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">

										<span className="font-medium">
											{eventClass.name}  {`(${eventClass.gender})`}
										</span>

									</div>

									<span className='text-xs px-2 py-1 rounded-md font-medium'>
										{eventClass.skillLevel}
									</span>
								</div>
							</button>
						);
					})
				}
			</div>
		</div>
	);
};