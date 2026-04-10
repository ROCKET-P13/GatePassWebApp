import { UseMutationResult } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	SortingState,
	OnChangeFn,
	ColumnDef
} from '@tanstack/react-table';
import { Icon } from '@ui/Icon';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableContainer
} from '@ui/Table';
import { Tooltip } from '@ui/Tooltip';
import { ChevronDown, ChevronsUpDown, ChevronUp, Pencil, SquareArrowOutUpRight, Trash } from 'lucide-react';
import { useMemo } from 'react';

import { EventStatusColorClass } from '@/Common/EventStatus';
import { Routes } from '@/Common/routes';
import { useEditEventTableMutation } from '@/hooks/mutations/useEditEventTableMutation';
import { deleteEventStore } from '@/stores/deleteEventStore';
import { editEventStore } from '@/stores/editEventStore';
import { Event } from '@/types/Event';

import { DeleteEventDialog } from '../../Dialogs/DeleteEventDialog';
import { EditEventDialog } from '../../Dialogs/EditEventDialog';

interface EventsTableProps {
	events: Event[];
	sorting: SortingState;
	onSortingChange: OnChangeFn<SortingState>;
}

export const EventsTable = ({ events, sorting, onSortingChange }: EventsTableProps) => {
	const queryKey: (string | SortingState)[] = ['events', sorting];

	const {
		openDialog: openEditEventDialog,
		isOpen: isEditEventDialogOpen,
		eventDraft,
		setEventDraft,
	} = editEventStore((state) => state);

	const {
		openDialog: openDeleteEventDialog,
		isOpen: isDeleteEventDialogOpen,
		setEventToDelete,
		eventToDelete,
	} = deleteEventStore((state) => state);

	const editEventMutation = useEditEventTableMutation({ queryKey });

	const columns = useMemo<ColumnDef<Event>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Event',
				cell: (info) => (
					<div className='flex flex-row gap-2'>
						<p>{info.getValue() as string}</p>
						<Tooltip content='View Event'>
							<Link
								to={`${Routes.DASHBOARD}/${Routes.EVENTS}/$eventId`}
								params={{ eventId: info.row.original.id }}
								className="font-medium hover:underline"
								target='_blank'
							>
								<button className='p-0 rounded-md hover:bg-muted hover:cursor-pointer'>
									<Icon size={12} className='text-muted-foreground' as={SquareArrowOutUpRight} />
								</button>
							</Link>

						</Tooltip>
					</div>

				),
			},
			{
				accessorKey: 'date',
				header: 'Date',
			},
			{
				accessorKey: 'startTime',
				header: 'Time',
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: (info) => {
					const status = info.getValue() as Event['status'];
					return (
						<span className={`px-2 py-1 text-xs rounded-md font-medium ${EventStatusColorClass[status]}`}>
							{status}
						</span>
					);
				},
			},
			{
				id: 'actions',
				header: '',
				enableSorting: false,
				cell: ({ row }) => (
					<div className="flex gap-2">
						<Tooltip content='Edit Event'>
							<button
								className="p-1 rounded-md hover:bg-muted"
								onClick={() => {
									openEditEventDialog();
									setEventDraft({
										id: row.original.id,
										name: row.original.name,
										status: row.original.status,
										participantCapacity: row.original.participantCapacity || null,
										startDateTime: row.original.startDateTime,
										startTime: row.original.startDateTime,
										date: row.original.startDateTime,
									});
								}}
							>
								<Icon as={Pencil} />
							</button>
						</Tooltip>

						<Tooltip content='Delete Event'>
							<button
								className="p-1 rounded-md hover:bg-muted"
								onClick={() => {
									openDeleteEventDialog();
									setEventToDelete({
										id: row.original.id,
										name: row.original.name,
									});
								}}
							>
								<Icon as={Trash} />
							</button>
						</Tooltip>

					</div>
				),
			},
		],
		[openEditEventDialog, setEventDraft, openDeleteEventDialog, setEventToDelete]
	);

	const table = useReactTable({
		data: events,
		columns,
		state: { sorting },
		onSortingChange,
		manualSorting: true,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<TableContainer>
			<Table>
				<TableHeader>
					{
						table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{
									headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : (
												<button
													onClick={header.column.getToggleSortingHandler()}
													className="flex items-center gap-2"
												>
													{
														flexRender(
															header.column.columnDef.header,
															header.getContext()
														)
													}

													{{
														asc: <Icon as={ChevronUp} />,
														desc: <Icon as={ChevronDown} />,
													}[header.column.getIsSorted() as string] ?? (
														header.column.getCanSort() && (
															<Icon as={ChevronsUpDown} />
														)
													)}
												</button>
											)}
										</TableHead>
									))
								}
							</TableRow>
						))
					}
				</TableHeader>

				<TableBody>
					{
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								className="hover:bg-muted/50 transition-colors"
							>
								{
									row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{
												flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)
											}
										</TableCell>
									))
								}
							</TableRow>
						))
					}
				</TableBody>
			</Table>

			<DeleteEventDialog
				open={isDeleteEventDialogOpen}
				eventToDelete={eventToDelete}
				queryKey={queryKey}
			/>

			<EditEventDialog
				open={isEditEventDialogOpen}
				eventDraft={eventDraft}
				editEventMutation={editEventMutation as UseMutationResult }
			/>
		</TableContainer>
	);
};
