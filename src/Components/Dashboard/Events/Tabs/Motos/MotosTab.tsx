import { MotoList } from '@/Components/Dashboard/Events/Tabs/Motos/MotoList';
import { useGetMotosForClassQuery } from '@/hooks/queries/useGetMotosForClassQuerty';
import { eventClassStore } from '@/stores/eventClassStore';
import { Moto } from '@/types/Moto';

interface MotosTabProps {
	eventId: string;
	eventClassId: string;
}

const motos: Moto[] = [
	{
		id: 'one',
		eventClassId: 'eventClassOne',
		motoNumber: 1,
		type: 'Heat',
		status: 'Scheduled',
		startTime: '00000000',
		createdAt: '123213123123',
	},
	{
		id: 'two',
		eventClassId: 'eventClassTwo',
		motoNumber: 2,
		type: 'Heat',
		status: 'Staging',
		startTime: '00000000',
		createdAt: '123213123123',
	},
	{
		id: 'three',
		eventClassId: 'eventClassThree',
		motoNumber: 3,
		type: 'LastChanceQualifier',
		status: 'Racing',
		startTime: '00000000',
		createdAt: '123213123123',
	},
	{
		id: 'four',
		eventClassId: 'eventClassFour',
		type: 'Main',
		motoNumber: 4,
		status: 'Finished',
		startTime: '00000000',
		createdAt: '123213123123',
	},
];

export const MotosTab = ({ eventId }: MotosTabProps) => {
	const selectedEventClass = eventClassStore((state) => state.selectedEventClass);

	const {
		data:
		_motos = [],
		isLoading,
		error,
	} = useGetMotosForClassQuery({ eventId, eventClassId: selectedEventClass.id });

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Failed to load motos
			</p>
		);
	}

	console.log({ motos });
	return (
		<>
			<div>motos tab</div>
			{
				isLoading
					? (
						<p>
						Loading motos...
						</p>
					)
					: (
						<MotoList motos={_motos}/>
					)
			}
		</>
	);
};